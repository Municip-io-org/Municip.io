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

        public MunicipalityStatusController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("municipalities")]
        //create a function to get all the municipalities as json. call it getMunicipalities
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






    }
}
