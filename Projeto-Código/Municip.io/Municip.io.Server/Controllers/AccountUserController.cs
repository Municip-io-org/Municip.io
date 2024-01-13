using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Municip.io.Server.Models;
using System.Text;

namespace Municip.io.Server.Controllers
{

    [ApiController]
    [Route("api/accounts")]
    public class AccountUserController : Controller
    {


        private readonly UserManager<MunicipUser> _userManager;

        public AccountUserController(UserManager<MunicipUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("UserData", Name = "Dados")]
        public async Task<IActionResult> UserData()
        {
            Console.WriteLine("User: " + await _userManager.GetUserAsync(User)
             );
            return Json(await _userManager.GetUserAsync(User));
        }


        [HttpGet("UserRole", Name = "Role")]
        public async Task<IActionResult> UserRole()
        {
            var user = await _userManager.GetUserAsync(User);

            if ( user != null)
            {
                string role = user.Role;
                return Json(role);
            }
            else
            {
                return Json("User not found");
            }
        }


        [HttpGet("GetUser", Name = "GetUser")]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user != null)
            {
                if (MunicipRole.MUNICIP.ToNameString() == user.Role)
                {
                    //get the current user identity and get the data from the database
                    return Json(user);

                }
                //TODO : add the other roles
            }
            return Json("User not found");
        }



        //methos to reguster a new user
        [HttpPost("Register", Name = "Register")]
        public async Task<IActionResult> Register(string name, string email,string role, string password )
        {
            if (ModelState.IsValid)
            {

                var user = new MunicipUser { UserName = name, Email = email,  Role = role };
                var result = await _userManager.CreateAsync(user, password);
                

                if (result.Succeeded)
                {
                    //TODO : add the other roles
                    if (MunicipRole.MUNICIP.ToNameString() == user.Role)
                    {
                        //add the user to the role
                        //await _userManager.AddToRoleAsync(user, MunicipRole.MUNICIP.ToNameString());
                        //get the current user identity and get the data from the database
                        return Json(user);

                    }
                    //TODO : add the other roles
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }




            }
            return Json("Model not valid");
        }
    }

}