using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Municip.io.Server.Models;
using Org.BouncyCastle.Bcpg.OpenPgp;
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





        [HttpPost("createSession")]
        public ActionResult Create(string email, string successUrl, string cancelUrl, string priceId, int documentRequestId)
        {


            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {

                        Price =  priceId,
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = successUrl,
                CancelUrl = cancelUrl,
                ExpiresAt = DateTime.Now.AddDays(1),
                //associate the session with the user
                CustomerEmail = email,
                //ad more data to the session
                Metadata = new Dictionary<string, string>
                {
                    { "documentRequestId", documentRequestId.ToString() },
                }

            };
            var service = new SessionService();
            Session session = service.Create(options);


            var sessionUrlJson = JsonSerializer.Serialize(session.Url);
            return Ok(sessionUrlJson);
        }



        [HttpPost("createPriceProduct")]
        public ActionResult CreatePrice(string name, string description, string image, float amount)
        {


            // Create a product
            var options = new ProductCreateOptions
            {
                Name = name,
                Images = new List<string> { image },
                Description = description
            };
            var service = new ProductService();
            var newProduct = service.Create(options);


            //the amount will be like 10€ or 10.03€, so chnage it to cents


            // Create a price of the product
            var optionsPrice = new PriceCreateOptions
            {
                Currency = "eur",
                UnitAmount = Convert.ToInt64(amount * 100),
                Product = newProduct.Id,
            };
            var servicePrice = new PriceService();
            var price = servicePrice.Create(optionsPrice);



            //send in "" the id of the price in json
            var priceIdJson = JsonSerializer.Serialize(price.Id);
            return Ok(priceIdJson);


        }


        //arquivar um price e um product
        [HttpPost("archivePriceProduct")]
        public ActionResult ArchivePrice(string priceId)
        {
            try
            {
                //get price
                var priceService = new PriceService();
                var price = priceService.Get(priceId);

                string productId = price.ProductId;


                //archive product
                var productService = new ProductService();
                var optionsProduct = new ProductUpdateOptions
                {
                    Active = false,
                };
                productService.Update(productId, optionsProduct);

                //archive price
                var optionsPrice = new PriceUpdateOptions
                {
                    Active = false,
                };
                priceService.Update(priceId, optionsPrice);


            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok();

        }





        //send email 
        [HttpPost("sendPayment")]
        public IActionResult SendPayment(string email, string name, string url, string amount)
        {
            EmailSender.SendEmailPayment(email, "Pagamento de Documento", name, "Por favor, realize o pagamento para a emissão do documento.", "root/html/PaymentEmail.html", url, amount);
            return Ok();
        }



    }


}
