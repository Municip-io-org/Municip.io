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
        public IActionResult CreateEvent(Event newEvent)
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




        [HttpPost("EnrollCitizen")]
        public IActionResult EnrollCitizen(int eventId, string email)
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);
            var evento = _context.Events.FirstOrDefault(e => e.Id == eventId);
            if (citizen != null && evento != null)
            {
                //TODO: check if citizen is already enrolled and if he belongs to the municipality
                Console.WriteLine(evento.Municipality.name);
                if(evento.Citizens == null)
                {
                    evento.Citizens = new List<Citizen>();
                }
                if (evento.Citizens.Count < evento.Capacity)
                {
                    evento.Citizens.Add(citizen);
                    _context.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "Event is full" });
                }
            }
            else
            {
                if(citizen == null)
                {
                    return BadRequest(new { message = "Citizen not found" });
                }
                else
                {
                    return BadRequest(new { message = "Event not found" });
                }

            }
        }

        //get all events where a citizen is enrolled
        [HttpGet("GetEventsByCitizen")]
        public IActionResult GetEventsByCitizen(string email)
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);
            if (citizen != null)
            {
                var events = _context.Events.Where(e => e.Citizens.Contains(citizen));
                return Json(events);
            }
            else
            {
                return BadRequest(new { message = "Citizen not found" });
            }
        }



    }
}
