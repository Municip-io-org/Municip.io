using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [ApiController]
    [Route("api/citizenstatus")]
    public class CitizenStatusController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CitizenStatusController(ApplicationDbContext context)
        {
            _context = context;
        }

        //create a function to get all the citizens from a municipality as json. call it getCitizens
        [HttpGet("citizens")]
            public IActionResult getCitizens(string? name)
        {
            var citizens = _context.Citizens.Where(c => c.Municipality == name).ToList();
            return Json(citizens);
        }

        [HttpPost("approveCitizen")]
        public async Task<IActionResult> approveCitizen(string? email)
        {
            var citizen = await _context.Citizens.FirstOrDefaultAsync(c => c.Email == email);
            if (citizen != null)
            {
                citizen.status = CitizenStatus.Approved;
                await _context.SaveChangesAsync();
                return Json(_context.Citizens.ToList());
            }
            return NotFound();
        }

        [HttpPost("deleteCitizen")]
        public async Task<IActionResult> deleteCitizen(string? email)
        {
            var citizen = await _context.Citizens.FirstOrDefaultAsync(c => c.Email == email);
            if (citizen != null)
            {
                _context.Citizens.Remove(citizen);
                await _context.SaveChangesAsync();
                return Json(_context.Citizens.ToList());
            }
            return NotFound();
        }

        [HttpPost("blockCitizen")]
        public async Task<IActionResult> blockCitizen(string? email)
        {
            var citizen = await _context.Citizens.FirstOrDefaultAsync(c => c.Email == email);
            if (citizen != null)
            {
                citizen.status = CitizenStatus.Blocked;
                await _context.SaveChangesAsync();
                return Json(_context.Citizens.ToList());
            }
            return NotFound();
        }

        [HttpPost("pendingCitizen")]
        public async Task<IActionResult> pendingCitizen(string? email)
        {
            var citizen = await _context.Citizens.FirstOrDefaultAsync(c => c.Email == email);
            if (citizen != null)
            {
                citizen.status = CitizenStatus.Pending;
                await _context.SaveChangesAsync();
                return Json(_context.Citizens.ToList());
            }
            return NotFound();
        }



        [HttpPost("SendAprove")]
        public IActionResult SendAprove(string email,string name)
        {
            EmailSender.SendEmail(email, "Resultado de Inscrição", name, "aceitar o seu pedido de inscrição na nossa plataforma.", "root/html/AproveEmail.html");
            return Ok("Success");
        }


        [HttpPost("SendDeny")]
        public IActionResult SendDeny(string email, string name)
        {
            EmailSender.SendEmail(email, "Resultado de Inscrição", name, "recusar o seu pedido de inscrição na nossa plataforma", "root/html/DenyEmail.html");
            return Ok("Success");
        }





    }
}
