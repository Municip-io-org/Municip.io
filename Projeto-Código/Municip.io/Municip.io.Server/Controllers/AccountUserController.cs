using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
                // Copy data from RegisterViewModel to IdentityUser
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

                    //create citizen object

                    
                    ////put the guid of the user in the citizen object
                    //citizen.Id = new Guid(user.Id); 
                    //citizen.Name = "name";
                    //citizen.Surname = "surname";
                    //citizen.Address = "address";
                    //citizen.Gender = "female";
                    //citizen.Municipality = "municipality";
                    //citizen.Nif = "nif";
                    //citizen.PostalCode = "postalCode";


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
                }

                return BadRequest();
            }

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

            // If user is successfully created, sign-in the user using
            // SignInManager and redirect to index action of HomeController
            if (result.Succeeded)
            {
                //add citizen to database
                _context.MunicipalAdministrators.Add(municipalAdministrator);
                await _context.SaveChangesAsync();
                return Ok();
            }

         
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest();
        }

            return BadRequest();
    }

        [HttpPost("registerMunicipality")]
        public async Task<IActionResult> RegisterMunicipality(Municipality municipality)

        {
            if (ModelState.IsValid)
            {
                //if not exists already in municipalities table
                if (!_context.Municipalities.Any(m => m.Name == municipality.Name))
                {
                    _context.Municipalities.Add(municipality);
                    await _context.SaveChangesAsync();
                    return Ok();
                }


            }

            return BadRequest();
        }



}

}