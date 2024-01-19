using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

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


                List<string> errors = new List<string>();
                // If there are any errors, add them to the ModelState object
                // which will be displayed by the validation summary tag helper
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                    
                    errors.Add(error.Description);
                }
                   return BadRequest(new { Message = "Falha no registo do cidadão.", ModelState = ModelState, errors });
                
            }
            return BadRequest(new { Message = "O modelo do cidadão é inválido.", ModelState = ModelState });

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
                    if (_context.Municipalities.All(m => m.name == municipalAdministrator.municipality))
                    {
                        // municipio existe
                        //return Ok(new { Message = "NEXISTE" });
                        return Ok(true);
                }
                    // município nao existe
                    return Ok(false);
            }


            List<string> errors = new List<string>();
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
                    // add errors to array
                    errors.Add(error.Description);        
            }

                return BadRequest(new { Message = "Falha no registo do administrador municipal.", ModelState = ModelState, errors = errors });
                // em vez disto devia enviar num array de string os 
            }


                return BadRequest(new { Message = "O modelo do administrador municipal é inválido.", ModelState = ModelState });

    }

        [HttpPost("registerMunicipality")]
        public async Task<IActionResult> RegisterMunicipality(Municipality? municipality)
        {
            if (ModelState.IsValid)
            {
                if (!_context.Municipalities.Any(m => m.name == municipality.name))
                {
                    GeoAPI geoAPI = new GeoAPI();
                    InformacoesMunicipio informacoesMunicipio = await geoAPI.ObterInformacoesMunicipio(municipality.name);
                    municipality.codigo = informacoesMunicipio.codigo;
                    municipality.nif = informacoesMunicipio.nif;
                    municipality.rua = informacoesMunicipio.rua;
                    municipality.localidade = informacoesMunicipio.localidade;
                    municipality.codigopostal = informacoesMunicipio.codigopostal;
                    municipality.descrpostal = informacoesMunicipio.descrpostal;
                    municipality.email = informacoesMunicipio.email;
                    municipality.telefone = informacoesMunicipio.telefone;
                    municipality.fax = informacoesMunicipio.fax;
                    municipality.sitio = informacoesMunicipio.sitio;
                    municipality.areaha = informacoesMunicipio.areaha;
                    municipality.populacao = informacoesMunicipio.populacao;
                    municipality.eleitores = informacoesMunicipio.eleitores;
                    municipality.codigoine = informacoesMunicipio.codigoine;
                   
                    municipality.distrito = informacoesMunicipio.distrito;

                    


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

        [HttpGet("InfoByEmail")]
        public async Task<IActionResult> InfoByEmail(string email)
        {
            if (_context.Citizens.Any(c => c.Email == email))
            {
                return Json(await _context.Citizens.Where(c => c.Email == email).FirstOrDefaultAsync());
            }
            else if (_context.MunicipalAdministrators.Any(m => m.Email == email))
            {
                return Json(await _context.MunicipalAdministrators.Where(m => m.Email == email).FirstOrDefaultAsync());
            }
            return BadRequest(new { Message = "Não existe nenhum utilizador com esse email." });
        }

        [HttpGet("InfoMunicipality")]
        public async Task<IActionResult> InfoMunicipality(string name)
        {
            if (_context.Municipalities.Any(m => m.name == name))
            {
                return Json(await _context.Municipalities.Where(m => m.name == name).FirstOrDefaultAsync());
            }
            return BadRequest(new { Message = "Não existe nenhum município com esse nome." });
        }

        // ISTO JA ESTAVA FEITO DENTRO DO CORPO DO REGISTERMUNICIPALADMINISTRATOR
        [HttpGet("Exists")]
        public async Task<IActionResult> municipalityExists(string municipality)
        {
            if(await _context.Municipalities.AnyAsync(m => m.name == municipality))
            {
                return Json(true);
            }
            return Json(false);

        }


}

}