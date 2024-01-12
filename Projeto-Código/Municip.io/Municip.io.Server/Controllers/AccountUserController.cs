using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{

    [ApiController]
    [Route("[controller]")]

    public class AccountUserController : Controller
    {

        //get the current user identity
        private readonly UserManager<MunicipUser> _userManager;

        public AccountUserController(UserManager<MunicipUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet(Name = "Dados")]
        public async Task<IActionResult> UserData()
        {
            Console.WriteLine("User: " + await _userManager.GetUserAsync(User)
             );
            return Json(await _userManager.GetUserAsync(User));


        }
    }

}