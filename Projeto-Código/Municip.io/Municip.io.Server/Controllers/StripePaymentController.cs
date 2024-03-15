using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [HttpPost]
        public ActionResult Create([FromBody] string email)
        {
            StripeConfiguration.ApiKey = "sk_test_51OuXzxP2EBv6AKDvatVzGyyqukIMntPmnsT67WMRWkzgbNluAoxnlH4okVTPXKRtriLWUiWJS2EuWNxGiifuV79700Vbj1wZUi";
            var domain = "http://localhost:4242";
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {

                        Price =  "price_1OuZ0eP2EBv6AKDvsLRT6YlD",
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



        //check if the payment was successful
        [HttpPost("verify")]
        public ActionResult Verify(string pi)
        {
            StripeConfiguration.ApiKey = "sk_test_51OuXzxP2EBv6AKDvatVzGyyqukIMntPmnsT67WMRWkzgbNluAoxnlH4okVTPXKRtriLWUiWJS2EuWNxGiifuV79700Vbj1wZUi";
            var service = new PaymentIntentService();
            var paymentIntent = service.Get(pi);

            return Content(JsonSerializer.Serialize(paymentIntent.Status), "application/json");

        }


       
    }


}
