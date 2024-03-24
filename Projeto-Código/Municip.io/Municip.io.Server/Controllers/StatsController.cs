using Microsoft.AspNetCore.Mvc;
using Municip.io.Server.Data;

namespace Municip.io.Server.Controllers
{
    [ApiController]
    [Route("api/stats")]
    public class StatsController : Controller
    {

        private readonly ApplicationDbContext _context;
        public StatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("getAllCitizens")]
        public IActionResult getAllCitizens()
        {
            return Ok(_context.Citizens);
        }

        [HttpGet("getAllMunicipalAdmins")]
        public IActionResult getAllMunicipalAdmins()
        {
            return Ok(_context.MunicipalAdministrators);
        }

        [HttpGet("getAllMunicipalities")]
        public IActionResult getAllMunicipalities()
        {
            return Ok(_context.Municipalities);
        }

        [HttpGet("getAllDocumentRequests")]
        public IActionResult getAllDocuments()
        {
            return Ok(_context.DocumentRequests);
        }

        [HttpGet("getAllNews")]
        public IActionResult getAllNews()
        {
            return Ok(_context.News);
        }

        [HttpGet("getAllEvents")]
        public IActionResult getAllEvents()
        {
            return Ok(_context.Events);
        }
        
    }
}
