using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.IO;

using Stripe.Checkout;
using Microsoft.Extensions.Options;
using Municip.io.Server.Models;
using Municip.io.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Text;
namespace Municip.io.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeWebHookController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        private string endpointSecret;

        private readonly IOptions<StripeModel> appSettings;


        private HttpClient client = new HttpClient();

        public StripeWebHookController(IOptions<StripeModel> app, ApplicationDbContext context)
        {
            appSettings = app;

            endpointSecret = appSettings.Value.WebHookSecret;

            _context = context;


        }


        [HttpPost]
        public async Task<IActionResult> Index()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                  json,
                  Request.Headers["Stripe-Signature"],
                  secret: endpointSecret
                );

                // Handle the checkout.session.completed event
                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Stripe.Checkout.Session;
                    var options = new SessionGetOptions();
                    options.AddExpand("line_items");

                    var service = new SessionService();
                    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
                    Session sessionWithLineItems = service.Get(session.Id, options);
                    StripeList<LineItem> lineItems = sessionWithLineItems.LineItems;

                    // Fulfill the purchase...
                    this.FulfillOrder(lineItems, session);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest(e);
            }
        }

        private async Task FulfillOrder(StripeList<LineItem> lineItems, Session session)
        {
            var item = lineItems.Data[0];
            var price = item.Price;
            var product = price.Product;


            var stripePayment = new StripePaymentController(appSettings);
            stripePayment.ArchivePrice(price.Id);



            var id = session.Metadata["documentRequestId"];

            var baseUrl = $"{this.Request.Scheme}://{this.Request.Host}";
            var url = baseUrl + $"/api/Documents/ApproveRequest?id={id}";


            await client.PostAsJsonAsync(url, id);

        }




    }
}

