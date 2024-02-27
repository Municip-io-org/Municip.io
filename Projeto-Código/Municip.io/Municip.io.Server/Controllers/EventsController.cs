using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
                if (newEvent.Capacity == 0)
                {
                    newEvent.Capacity = 1;
                }


                if (newEvent.StartRegistration > newEvent.StartDate || newEvent.EndRegistration > newEvent.StartDate)
                {
                    return BadRequest(new { message = "A data de inscrição tem de ser antes da data do evento" });

                }
                else if (newEvent.StartRegistration > newEvent.EndRegistration)
                {
                    return BadRequest(new { message = "Data de Inscrição Inválida" });
                }
                else if (newEvent.StartDate > newEvent.EndDate)
                {
                    return BadRequest(new { message = "Data de Evento Inválida" });
                }
                else if (newEvent.StartDate == newEvent.EndDate)
                {
                    return BadRequest(new { message = "A data início do evento não pode ser igual a data de fim do evento" });
                }
                else if (newEvent.StartRegistration == newEvent.EndRegistration)
                {
                    return BadRequest(new { message = "A data início de inscrição não pode ser igual a data de fim de inscrição" });
                }

                else
                {
                    _context.Events.Add(newEvent);
                    _context.SaveChanges();
                    return Ok();
                }

            }
            else
            {
                return BadRequest(new { message = "Invalid model", ModelState });
            }
        }



        [HttpPut("UpdateEvent")]
        public IActionResult UpdateEvent(Event updatedEvent)
        {
            if (ModelState.IsValid)
            {
                var evento = _context.Events.FirstOrDefault(e => e.Id == updatedEvent.Id);
                if (evento != null)
                {
                    if (updatedEvent.Capacity == 0)
                    {
                        updatedEvent.Capacity = 1;
                    }

                    if (updatedEvent.StartRegistration > updatedEvent.StartDate || updatedEvent.EndRegistration > updatedEvent.StartDate)
                    {
                        return BadRequest(new { message = "A data de inscrição tem de ser antes da data do evento" });

                    }
                    else if (updatedEvent.StartRegistration > updatedEvent.EndRegistration)
                    {
                        return BadRequest(new { message = "Data de Inscrição Inválida" });
                    }
                    else if (updatedEvent.StartDate > updatedEvent.EndDate)
                    {
                        return BadRequest(new { message = "Data de Evento Inválida" });
                    }
                    else if (updatedEvent.StartDate == updatedEvent.EndDate)
                    {
                        return BadRequest(new { message = "A data início do evento não pode ser igual a data de fim do evento" });
                    }
                    else if (updatedEvent.StartRegistration == updatedEvent.EndRegistration)
                    {
                        return BadRequest(new { message = "A data início de inscrição não pode ser igual a data de fim de inscrição" });
                    }
                    else
                    {

                        _context.Entry(evento).CurrentValues.SetValues(updatedEvent);
                        _context.SaveChanges();
                        return Ok();
                    }
                }
                else
                {
                    return BadRequest(new { message = "Event not found" });
                }
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

        [HttpGet("GetEventsByMunicipality")]
        public IActionResult GetEventsByMunicipality(string municipalityName)
        {
            if (!ModelState.IsValid)
            {
                var validationErrors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Message = "Erro de Validação", Errors = validationErrors });

            }

            var events = _context.Events;
            var municipalityEvents = events.Where(e => e.Municipality == municipalityName);

            if (municipalityEvents.IsNullOrEmpty())
            {
                return NotFound(new { message = "Events from " + municipalityName + " Not Found" });
            }

            return Json(municipalityEvents);
        }

        [HttpGet("GetEventById")]
        public IActionResult GetEventById(int eventId)
        {
            if (!ModelState.IsValid)
            {
                var validationErrors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Message = "Erro de Validação", Errors = validationErrors });

            }

            var events = _context.Events;
            var eventById = _context.Events.Where(e => e.Id == eventId).Include(e => e.Citizens).FirstOrDefault();


            if (eventById == null)
            {
                return NotFound(new { message = "Not Found any event with id: " + eventId });
            }



            return Json(eventById);
        }

        [HttpPost("EnrollCitizen")]
        public IActionResult EnrollCitizen(int eventId, string email)
        {
            try
            {
                var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);
                var evento = _context.Events.Include(e=> e.Citizens).FirstOrDefault(e => e.Id == eventId);

                if (citizen != null && evento != null && evento.Municipality == citizen.Municipality &&
                    (evento.Citizens == null || evento.Citizens.Find(c => c.Email == email) == null))
                {
                    evento.Citizens ??= [];

                    if (evento.Citizens.Count < evento.Capacity)
                    {


                        if (evento.Citizens.Any(c => c.Email == email))
                        {
                            return BadRequest(new { message = "Cidadão já está inscrito no evento" });
                        }


                        evento.Citizens.Add(citizen);
                        evento.NRegistrations = evento.NRegistrations + 1;
                        _context.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        return BadRequest(new { message = "O evento está cheio" });
                    }
                }
                else
                {
                    if (citizen == null)
                    {
                        return BadRequest(new { message = "Cidadão não encontrado" });
                    }
                    else if (evento == null)
                    {
                        return BadRequest(new { message = "Evento não encontrado" });
                    }
                    else if (evento.Municipality != citizen.Municipality)
                    {
                        return BadRequest(new { message = "O cidadão em causa não pertence ao município" });
                    }
                    else
                    {
                        return BadRequest(new { message = "Cidadão já registado" });
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Ocorreu um erro desconhecido ao inscrever o cidadão no evento" });
            }
        }

        [HttpPost("DropOutCitizen")]
        public IActionResult DropOutCitizen(int eventId, string email)
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);
            var evento = _context.Events.Include(e => e.Citizens).FirstOrDefault(e => e.Id == eventId);

            if (citizen != null && evento != null && evento.Municipality == citizen.Municipality &&
                                              (evento.Citizens != null && evento.Citizens.Find(c => c.Email == email) != null))
            {
                evento.Citizens.Remove(citizen);
                evento.NRegistrations = evento.NRegistrations - 1;
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                if (citizen == null)
                {
                    return BadRequest(new { message = "Citizen not found" });
                }
                else if (evento == null)
                {
                    return BadRequest(new { message = "Event not found" });
                }
                else if (evento.Municipality != citizen.Municipality)
                {
                    return BadRequest(new { message = "Citizen does not belong to the municipality" });
                }
                else
                {
                    return BadRequest(new { message = "Citizen is not enrolled" });
                }
            }
        }



        [HttpPost("RemoveCitizen")]
        public IActionResult RemoveCitizen(int eventId, string email)
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);
            var evento = _context.Events.Include(e => e.Citizens).FirstOrDefault(e => e.Id == eventId);

            if (citizen != null && evento != null && evento.Municipality == citizen.Municipality &&
                               (evento.Citizens != null && evento.Citizens.Find(c => c.Email == email) != null))
            {
                evento.Citizens.Remove(citizen);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                if (citizen == null)
                {
                    return BadRequest(new { message = "Citizen not found" });
                }
                else if (evento == null)
                {
                    return BadRequest(new { message = "Event not found" });
                }
                else if (evento.Municipality != citizen.Municipality)
                {
                    return BadRequest(new { message = "Citizen does not belong to the municipality" });
                }
                else
                {
                    return BadRequest(new { message = "Citizen is not enrolled" });
                }
            }
        }




        [HttpGet("GetEventsByCitizen")]
        public IActionResult GetEventsByCitizen(string email)
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);
            if (citizen != null)
            {
                var events = _context.Events.Where(e => e.Citizens.Contains(citizen)).Include(e => e.Citizens);
                return Json(events);
            }
            else
            {
                return BadRequest(new { message = "Citizen not found" });
            }
        }



        [HttpDelete("RemoveEvent")]
        public IActionResult RemoveEvent(int eventId)
        {
            var evento = _context.Events.FirstOrDefault(e => e.Id == eventId);
            if (evento != null)
            {
                _context.Events.Remove(evento);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Event not found" });
            }
        }
    }
}
