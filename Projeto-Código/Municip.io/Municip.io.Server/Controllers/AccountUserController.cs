using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
using System.Text;

namespace Municip.io.Server.Controllers
{

    [ApiController]
    [Route("api/accounts")]
    public class AccountUserController : Controller
    {


        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public AccountUserController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("UserData", Name = "Dados")]
        public async Task<IActionResult> UserData()
        {
            Console.WriteLine("User: " + await _userManager.GetUserAsync(User)
             );
            return Json(await _userManager.GetUserAsync(User));
        }




        // register a new user account

        [HttpPost("registerCitizen")]
        public async Task<IActionResult> RegisterCitizen(Citizen citizen)

        {
            if (ModelState.IsValid)
            {
                var user = new IdentityUser
                {
                    UserName = citizen.Email,
                    Email = citizen.Email
                };


                // Store user data in AspNetUsers database table
                var result = await _userManager.CreateAsync(user, citizen.Password);

                // If user is successfully created, sign-in the user using
                // SignInManager and redirect to index action of HomeController
                if (result.Succeeded)
                {


                    //add citizen to database
                    _context.Citizens.Add(citizen);
                    await _context.SaveChangesAsync();
                    return Ok();
                }

                // If there are any errors, add them to the ModelState object
                // which will be displayed by the validation summary tag helper
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                    Console.WriteLine(error.Description);
                }
                   return BadRequest(new { Message = "Falha no registo do cidadão.", ModelState = ModelState });
                return BadRequest();
            }
            return BadRequest(new { Message = "O modelo do cidadão é inválido.", ModelState = ModelState });
            return BadRequest();
        }

        [HttpPost("registerMunicipalAdministrator")]
        public async Task<IActionResult> RegisterMunicipalAdministrator(MunicipalAdministrator municipalAdministrator)

        {
            if (ModelState.IsValid)
            {
                
                var user = new IdentityUser
                {
                    UserName = municipalAdministrator.Email,
                    Email = municipalAdministrator.Email
                };

            // Store user data in AspNetUsers database table
            var result = await _userManager.CreateAsync(user, municipalAdministrator.Password);

         
            if (result.Succeeded)
            {
                //add citizen to database
                _context.MunicipalAdministrators.Add(municipalAdministrator);
                await _context.SaveChangesAsync();
                    if (_context.Municipalities.All(m => m.Name == municipalAdministrator.municipality))
                    {
                        // municipio existe
                        //return Ok(new { Message = "NEXISTE" });
                        return Ok(true);
                }
                    // município nao existe
                    return Ok(false);
            }

         
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

                  return BadRequest(new { Message = "Falha no registo do administrador municipal.", ModelState = ModelState });
            }

                return BadRequest(new { Message = "O modelo do administrador municipal é inválido.", ModelState = ModelState });

    }

        [HttpPost("registerMunicipality")]
        public async Task<IActionResult> RegisterMunicipality(Municipality municipality)
        {
            if (ModelState.IsValid)
            {
                if (!_context.Municipalities.Any(m => m.Name == municipality.Name))
                {
                    _context.Municipalities.Add(municipality);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    // Se o município já existe, retorne um erro BadRequest com uma mensagem específica.
                    return BadRequest(new { Message = "Já existe um município com o mesmo nome." });
                }
            }

            // Se o modelo não for válido, retorne um erro BadRequest com detalhes do modelo.
            return BadRequest(new { Message = "O modelo do município é inválido.", ModelState = ModelState });
        }



        // ISTO JA ESTAVA FEITO DENTRO DO CORPO DO REGISTERMUNICIPALADMINISTRATOR
        [HttpGet("Exists")]
        public async Task<IActionResult> municipalityExists(String municipality)
        {
            if(await _context.Municipalities.AnyAsync(m => m.Name == municipality))
            {
                return Json(true);
            }
            return Json(false);

        }


}

}