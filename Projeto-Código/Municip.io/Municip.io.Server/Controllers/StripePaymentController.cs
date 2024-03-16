using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Municip.io.Server.Models;
using Stripe;
using Stripe.Checkout;
using System.Text.Json;

namespace Municip.io.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripePaymentController : ControllerBase
    {

        private readonly IOptions<StripeModel> appSettings;

        public StripePaymentController(IOptions<StripeModel> app)
        {
            appSettings = app;

            StripeConfiguration.ApiKey = appSettings.Value.SecretKey;
        }


        [HttpPost]
        public ActionResult Create([FromBody] string email)
        {
          
            var domain = "http://localhost:4242";
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {

                        Price =  "price_1OuvBoP2EBv6AKDvIVRFmIzl",
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = domain + "/success.html",
                CancelUrl = domain + "/cancel.html",

                //associate the session with the user
                CustomerEmail = email,

            };
            var service = new SessionService();
            Session session = service.Create(options);

            var json = JsonSerializer.Serialize(session.Url);

            return Content(json, "application/json");
        }



        [HttpPost("createPriceProduct")]
        public ActionResult CreatePrice()
        {
         

            // Create a product
            var options = new ProductCreateOptions
            {
                Name = "Requerimento",
                Images = new List<string> { "https://example.com/t-shirt.png" },
                Description = "Municip.io Documento"
            };
            var service = new ProductService();
            var newProduct = service.Create(options);




            // Create a price of the product
            var optionsPrice = new PriceCreateOptions
            {
                Currency = "eur",
                UnitAmount = 1000,
                Product = newProduct.Id,
            };
            var servicePrice = new PriceService();
            servicePrice.Create(optionsPrice);


            return Ok(newProduct.Id);
        }



    }


}
