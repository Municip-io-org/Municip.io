using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.IO;

using Stripe.Checkout;
using Microsoft.Extensions.Options;
using Municip.io.Server.Models;
namespace Municip.io.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeWebHookController : ControllerBase
    {


        private string endpointSecret;

        private readonly IOptions<StripeModel> appSettings;

        public StripeWebHookController(IOptions<StripeModel> app)
        {
            appSettings = app;

            endpointSecret = appSettings.Value.WebHookSecret;
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
                    this.FulfillOrder(lineItems);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }

        private void FulfillOrder(StripeList<LineItem> lineItems)
        {
            var item = lineItems.Data[0];
            var price = item.Price;
            var product = price.Product;
            

            var stripePayment = new StripePaymentController(appSettings);
            stripePayment.ArchivePrice(price.Id);


            Console.WriteLine(lineItems);
        }
    }
}

