using Microsoft.AspNetCore.Mvc;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [ApiController]
    [Route("api/events")]
    public class EventsController : Controller
    {
        private readonly ApplicationDbContext _context;
        public EventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("CreateEvent")]
        public IActionResult CreateEvent( Event newEvent)
        {
            if (ModelState.IsValid)
            {
                _context.Events.Add(newEvent);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Invalid model", ModelState });

            }


        }

        [HttpGet("GetEvents")]
        public IActionResult GetEvents()
        {
            var events = _context.Events;
            return Json(events);
        }



    }
}
