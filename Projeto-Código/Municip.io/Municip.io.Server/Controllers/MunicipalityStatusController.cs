using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public MunicipalityStatusController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("Municipalities")]
        //create a function to get all the municipalities as json. call it getMunicipalities
        public IActionResult getMunicipalities()
        {
            _context.Municipalities.ToList();
            return Json(_context.Municipalities);
            
        }

        [HttpPost("approveMunicipality")]
        public IActionResult approveMunicipality(string name)
        {
            var municipality = _context.Municipalities.FirstOrDefault(m => m.name == name);
            if (municipality != null)
            {
                municipality.status = MunicipalityStatus.Approved;
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }


        [HttpPost("blockMunicipality")]
        public IActionResult blockMunicipality(string name)
        {
            var municipality = _context.Municipalities.FirstOrDefault(m => m.name == name);
            if (municipality != null)
            {
                municipality.status = MunicipalityStatus.Blocked;
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }





    }
}
