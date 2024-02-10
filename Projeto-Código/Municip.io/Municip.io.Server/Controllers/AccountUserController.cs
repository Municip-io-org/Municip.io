﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
using System.Text;
using System.Text.RegularExpressions;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Municip.io.Server.Controllers
{
    /// <summary>
    /// Controlador de contas de utilizador. Permite registar novos utilizadores e obter informações sobre os mesmos.
    /// </summary>
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

        /// <summary>
        /// Obtém os dados do utilizador autenticado.
        /// </summary>
        /// <returns>JSON</returns>
        [HttpGet("UserInfo", Name = "Dados")]
        public async Task<IActionResult> UserInfo()
        {

            // if there is a user logged in send his info, else send bad request
            if (User.Identity.IsAuthenticated)
            {
                return Json(await _userManager.GetUserAsync(User));
            }
            return BadRequest(new { Message = "Utilizador não autenticado." });
        }


        //function to get the role who the user belongs to
        [HttpGet("UserRole")]
        public async Task<IActionResult> UserRole()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _userManager.GetUserAsync(User);
                var role = await _userManager.GetRolesAsync(user);
                return Json(
                 new { role = role[0] });
            }
            return BadRequest(new { Message = "Utilizador não autenticado." });
        }




        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            // Retorna uma resposta apropriada, como um status 200 OK
            return Ok(new { message = "Logout successful" });
        }




        /// <summary>
        /// Registo de um cidadão (conta + base dados de cidadão)
        /// </summary>
        /// <param name="citizen"></param>
        /// <returns>StatusCode</returns>
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


                    await _userManager.AddToRoleAsync(user, "Citizen");
                    //add citizen to database
                    citizen.date = DateOnly.FromDateTime(DateTime.Now);
                    citizen.status = CitizenStatus.Pending;
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
        /// <summary>
        ///Registo de um administrador municipal (conta + base de dados) 
        /// </summary>
        /// <param name="municipalAdministrator"></param>
        /// <returns>StatusCode</returns>

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


                    await _userManager.AddToRoleAsync(user, "Municipal");
                    //add citizen to database
                    _context.MunicipalAdministrators.Add(municipalAdministrator);
                    await _context.SaveChangesAsync();
                    if (_context.Municipalities.Any(m => m.name == municipalAdministrator.municipality))
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

        /// <summary>
        /// Registo de município na base de dados. Executado aquando da criação do adminsitrador municipal na primeira vez
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns>StatusCode</returns>
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
                    municipality.date = DateOnly.FromDateTime(DateTime.Now);
                    municipality.numberOfUsers = 0;
                    municipality.status = MunicipalityStatus.Pending;




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


        /// <summary>
        /// Info do utilizador após inserção de email
        /// </summary>
        /// <param name="email"></param>
        /// <returns>JSON</returns>
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

        /// <summary>
        /// Verifica se município existe retornando booleano
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns>Bool</returns>
        [HttpGet("Exists")]
        public async Task<IActionResult> municipalityExists(string municipality)
        {
            if (await _context.Municipalities.AnyAsync(m => m.name == municipality))
            {
                return Json(true);
            }
            return Json(false);

        }

        [HttpPut("UpdateUserInfo")]
        public async Task<IActionResult> UpdateUserInfo(Citizen updatedCitizen)
        {
            if (ModelState.IsValid)
            {
                var existingCitizen = await _context.Citizens.FindAsync(updatedCitizen.Id);

                if (existingCitizen == null)
                {
                    return NotFound();
                }

                if (existingCitizen.firstName != updatedCitizen.firstName)
                {
                    existingCitizen.firstName = updatedCitizen.firstName;
                }

                if (existingCitizen.Surname != updatedCitizen.Surname)
                {
                    existingCitizen.Surname = updatedCitizen.Surname;
                }

                if (existingCitizen.Email != updatedCitizen.Email)
                {
                    existingCitizen.Email = updatedCitizen.Email;
                    
                }

                if (existingCitizen.birthDate != updatedCitizen.birthDate)
                {
                    existingCitizen.birthDate = updatedCitizen.birthDate;
                }

                if (existingCitizen.Address != updatedCitizen.Address)
                {
                    existingCitizen.Address = updatedCitizen.Address;
                }

                if (existingCitizen.Nif != updatedCitizen.Nif)
                {
                    existingCitizen.Nif = updatedCitizen.Nif;
                }

                if (existingCitizen.postalCode1 != updatedCitizen.postalCode1)
                {
                    existingCitizen.postalCode1 = updatedCitizen.postalCode1;
                }

                if (existingCitizen.postalCode2 != updatedCitizen.postalCode2)
                {
                    existingCitizen.postalCode2 = updatedCitizen.postalCode2;
                }

                if (existingCitizen.Password != updatedCitizen.Password)
                {
                    
                    if (!ValidadePassword(updatedCitizen.Password))
                    {
                        ModelState.AddModelError("password", "Password não obedece aos requisitos");
                        var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                        return BadRequest(new { Message = "Erro de Validação", Errors = errors });
                    }

                    existingCitizen.Password = updatedCitizen.Password;
                } 

                if (_context.ChangeTracker.HasChanges())
                {
                    await _context.SaveChangesAsync();
                    return Ok();
                }

                return NoContent();
            }

            var validationErrors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return BadRequest(new { Message = "Erro de Validação", Errors = validationErrors });
        }


        private bool ValidadePassword(string password)
        {
            return password.Length >= 8 &&
                   password.Any(char.IsUpper) &&
                   password.Any(char.IsDigit) &&
                   password.Any(ch => !char.IsLetterOrDigit(ch));
        }

        


    }
}