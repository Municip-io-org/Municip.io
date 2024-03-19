using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [Route("api/municipalAdministratorStatus")]
    [ApiController]
    public class MunicipalAdministratorStatusController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public MunicipalAdministratorStatusController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        /// <summary>
        /// Esta função retorna todos os administradores de um município. Recebe como parâmetro o nome do município.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet("municipalAdministrators")]
        public IActionResult getMunicipalAdministrators(string? name)
        {

            var munadmin = _context.MunicipalAdministrators.Where(m => m.municipality == name).ToList();
            return Json(munadmin);

        }

        /// <summary>
        /// Esta função aprova um administrador. Recebe como parâmetro o email do administrador .
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost("approveMunicipalAdministrator")]
        public async Task<IActionResult> approveMunicipalAdministrator(string? email)
        {
            var ma = await _context.MunicipalAdministrators.FirstOrDefaultAsync(m => m.Email == email);
            if (ma!= null)
            {

                if (ma.status == MunicipalAdministratorStatus.Blocked)
                {
                    SendUnblock(ma.Email, ma.firstName);
                }
                else
                {
                    SendAprove(ma.Email, ma.firstName);

                }
                ma.status = MunicipalAdministratorStatus.Approved;
                await _context.SaveChangesAsync();

                return Json(_context.MunicipalAdministrators.ToList());
            }
            return NotFound();
        }

        /// <summary>
        /// Esta função remove um administrador. Recebe como parâmetro o email do administrador .
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>

        [HttpPost("deleteMunicipalAdministrator")]
        public async Task<IActionResult> deleteMunicipalAdministrator(string? email)
        {
            var ma = await _context.MunicipalAdministrators.FirstOrDefaultAsync(c => c.Email == email);
            if (ma!= null)
            {
                _context.MunicipalAdministrators.Remove(ma);
                await _context.SaveChangesAsync();


                var user = await _userManager.FindByEmailAsync(email);
                if (user != null)
                {
                    await _userManager.DeleteAsync(user);
                }

                if (ma.status == MunicipalAdministratorStatus.Pending)
                {
                    SendDeny(ma.Email, ma.firstName);
                }
                else
                {
                    SendRemove(ma.Email, ma.firstName);
                }
                return Json(_context.MunicipalAdministrators.ToList());
            }
            return NotFound();
        }

        /// <summary>
        /// Esta função bloqueia um administrador. Recebe como parâmetro o email do administrador .
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost("blockMunicipalAdministrator")]
        public async Task<IActionResult> blockMunicipalAdministrator(string? email)
        {
            var ma = await _context.MunicipalAdministrators.FirstOrDefaultAsync(m => m.Email == email);
            if (ma!= null)
            {
                ma.status = MunicipalAdministratorStatus.Blocked;
                await _context.SaveChangesAsync();
                SendBlock(ma.Email, ma.firstName);
                return Json(_context.MunicipalAdministrators.ToList());
            }
            return NotFound();
        }

        /// <summary>
        /// Esta função desbloqueia um administrador. Recebe como parâmetro o email do administrador .
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost("pendingMunicipalAdministrator")]
        public async Task<IActionResult> pendingMunicipalAdministrator(string? email)
        {
            var ma = await _context.MunicipalAdministrators.FirstOrDefaultAsync(m => m.Email == email);
            if (ma != null)
            {
                ma.status = MunicipalAdministratorStatus.Pending;
                await _context.SaveChangesAsync();
                return Json(_context.MunicipalAdministrators.ToList());
            }
            return NotFound();
        }


        /// <summary>
        /// Esta função envia um email de aprovação para um administrador.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("SendAprove")]
        public IActionResult SendAprove(string email, string name)
        {
            EmailSender.SendEmailAproveDeny(email, "Resultado de Inscrição", name, UserStatusMessage.Approve.toString(), "root/html/AproveEmail.html");
            return Ok("Success");
        }

        /// <summary>
        /// Esta função envia um email de reprovação para um administrador.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <returns></returns>

        [HttpPost("SendDeny")]
        public IActionResult SendDeny(string email, string name)
        {
            EmailSender.SendEmailAproveDeny(email, "Resultado de Inscrição", name, UserStatusMessage.Deny.toString(), "root/html/DenyEmail.html");
            return Ok("Success");
        }

        /// <summary>
        /// Esta função envia um email de remoção para um administrador.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("SendRemove")]
        public IActionResult SendRemove(string email, string name)
        {
            EmailSender.SendEmailAproveDeny(email, "Remoção de conta", name, UserStatusMessage.Remove.toString(), "root/html/DenyEmail.html");
            return Ok("Success");
        }

        /// <summary>
        /// Esta função envia um email de bloqueio para um administrador.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <returns></returns>

        [HttpPost("SendBlock")]
        public IActionResult SendBlock(string email, string name)
        {
            EmailSender.SendEmailAproveDeny(email, "Bloqueio de Conta", name, UserStatusMessage.Block.toString(), "root/html/DenyEmail.html");
            return Ok("Success");
        }

        /// <summary>
        /// Esta função envia um email de desbloqueio para um administrador.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("SendUnblock")]
        public IActionResult SendUnblock(string email, string name)
        {
            EmailSender.SendEmailAproveDeny(email, "Desbloqueio de Conta", name, UserStatusMessage.Unblock.toString(), "root/html/AproveEmail.html");
            return Ok("Success");
        }





    }
}
