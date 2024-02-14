using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [ApiController]
    [Route("api/municipalitystatus")]
    public class MunicipalityStatusController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public MunicipalityStatusController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("municipalities")]
        public IActionResult getMunicipalities()
        {
            _context.Municipalities.ToList();
            return Json(_context.Municipalities);
            
        }

        [HttpPost("approveMunicipality")]
        public async Task<IActionResult> approveMunicipality( string? name)
        {
            Console.WriteLine(name);
            var  municipality = await _context.Municipalities.FirstOrDefaultAsync(m => m.name == name);
            if ( municipality != null)
            {
                municipality.status = MunicipalityStatus.Approved;
                await _context.SaveChangesAsync();
                await sendEmailToMunicipalAdmins(municipality.name, SendAprove);
                return Json(_context.Municipalities.ToList());
            }
            return NotFound();
        }

        [HttpPost("deleteMunicipality")]
        public async Task<IActionResult> deleteMunicipality(string? name)
        {
            var municipality = await _context.Municipalities.FirstOrDefaultAsync(m => m.name == name);
            if (municipality != null)
            {
                _context.Municipalities.Remove(municipality);
                await _context.SaveChangesAsync();
                
                if(municipality.status == MunicipalityStatus.Approved)
                {
                    await sendEmailToMunicipalAdmins(municipality.name, SendRemove);
                }
                else
                {
                    await sendEmailToMunicipalAdmins(municipality.name, SendDeny);
                }
                await deleteAllAccountsByMunicipality(municipality.name);
                return Json(_context.Municipalities.ToList());
            }
            return NotFound();
        }

        [HttpPost("pendingMunicipality")]
        public IActionResult pendingMunicipality(string name)
        {
            var municipality = _context.Municipalities.FirstOrDefault(m => m.name == name);
            if (municipality != null)
            {
                municipality.status = MunicipalityStatus.Pending;
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }


        [NonAction]
        public async Task<IActionResult> deleteAllAccountsByMunicipality(string municipality)
        {
            var accounts = await _context.MunicipalAdministrators.Where(a => a.municipality == municipality).ToListAsync();
            if (accounts != null)
            {
                _context.MunicipalAdministrators.RemoveRange(accounts);
                await _context.SaveChangesAsync();


                foreach (var account in accounts)
                {
                    var user = await _userManager.FindByEmailAsync(account.Email);
                    if (user != null)
                    {
                        await _userManager.DeleteAsync(user);
                    }
                }

                return Ok();
            }
            return NotFound();
        }

        //function to send email to all the admins of the municipality, receive the function to send the email
        [NonAction]
        public async Task<IActionResult> sendEmailToMunicipalAdmins(string municipality, Func<string, string,string , IActionResult> sendEmail)
        {
            var admins = await _context.MunicipalAdministrators.Where(a => a.municipality == municipality).ToListAsync();
            if (admins != null)
            {
                foreach (var admin in admins)
                {
                    sendEmail(admin.Email, admin.firstName, admin.municipality);
                }
                return Ok();
            }
            return NotFound();
        }





        [HttpPost("SendAprove")]
        public IActionResult SendAprove(string email, string name, string municipality)
        {
            EmailSender.SendEmail(email, $"Inscrição do Município de {municipality}", name, MunicipalityStatusMessage.Approve.toString(), "root/html/AproveEmail.html");
            return Ok("Success");
        }


        [HttpPost("SendDeny")]
        public IActionResult SendDeny(string email, string name, string municipality)
        {
            EmailSender.SendEmail(email, $"Inscrição do Município de {municipality}", name, MunicipalityStatusMessage.Deny.toString(), "root/html/DenyEmail.html");
            return Ok("Success");
        }


        [HttpPost("SendRemove")]
        public IActionResult SendRemove(string email, string name, string municipality)
        {
            EmailSender.SendEmail(email, $"Remoção Município de {municipality}", name, MunicipalityStatusMessage.Remove.toString(), "root/html/DenyEmail.html");
            return Ok("Success");
        }




    }
}
