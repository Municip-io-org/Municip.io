using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{

    /// <summary>
    /// Este controlador é responsável por gerir o estado dos municípios.
    /// </summary>
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

        /// <summary>
        /// Esta função retorna todos os municípios como json.
        /// </summary>
        /// <returns></returns>
        [HttpGet("municipalities")]
        public IActionResult getMunicipalities()
        {
            _context.Municipalities.ToList();
            return Json(_context.Municipalities);
            
        }

        /// <summary>
        /// Esta função retorna todos os municípios aprovados como json.
        /// </summary>
        /// <returns></returns>
        [HttpGet("approvedMunicipalities")]
        public IActionResult GetApprovedMunicipalities()
        {
            var approvedMunicipalities = _context.Municipalities.Where(m => m.status == MunicipalityStatus.Approved).ToList();
            return Json(approvedMunicipalities);
        }

        /// <summary>
        /// Esta função aprova um município. Recebe como parâmetro o nome do município.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Esta função remove um município. Recebe como parâmetro o nome do município.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Esta função coloca um município em estado de espera. Recebe como parâmetro o nome do município.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Esta função remove todas as contas de administradores de um município. Recebe como parâmetro o nome do município. Não é uma ação passível de ser chamada via API
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns></returns>

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


        /// <summary>
        /// esta função envia um email para todos os administradores de um município. Recebe como parâmetro o nome do município e uma função que envia o email. Não é uma ação passível de ser chamada via API
        /// </summary>
        /// <param name="municipality"></param>
        /// <param name="sendEmail"></param>
        /// <returns></returns>
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



        /// <summary>
        /// Esta função envia um email para um administrador de um município. Recebe como parâmetro o email, o nome do administrador e o nome do município.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <param name="municipality"></param>
        /// <returns></returns>

        [HttpPost("SendAprove")]
        public IActionResult SendAprove(string email, string name, string municipality)
        {
            EmailSender.SendEmail(email, $"Inscrição do Município de {municipality}", name, MunicipalityStatusMessage.Approve.toString(), "root/html/AproveEmail.html");
            return Ok("Success");
        }

        /// <summary>
        /// esta função envia um email de negação para um administrador de um município. Recebe como parâmetro o email, o nome do administrador e o nome do município.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <param name="municipality"></param>
        /// <returns></returns>
        [HttpPost("SendDeny")]
        public IActionResult SendDeny(string email, string name, string municipality)
        {
            EmailSender.SendEmail(email, $"Inscrição do Município de {municipality}", name, MunicipalityStatusMessage.Deny.toString(), "root/html/DenyEmail.html");
            return Ok("Success");
        }

        /// <summary>
        /// esta função envia um email de remoção para um administrador de um município. Recebe como parâmetro o email, o nome do administrador e o nome do município.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <param name="municipality"></param>
        /// <returns></returns>
        [HttpPost("SendRemove")]
        public IActionResult SendRemove(string email, string name, string municipality)
        {
            EmailSender.SendEmail(email, $"Remoção Município de {municipality}", name, MunicipalityStatusMessage.Remove.toString(), "root/html/DenyEmail.html");
            return Ok("Success");
        }




    }
}
