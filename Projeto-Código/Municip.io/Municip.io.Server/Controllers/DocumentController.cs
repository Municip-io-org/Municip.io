using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [ApiController]
    [Route("api/documents")]

    public class DocumentController : Controller
    {

        private readonly ApplicationDbContext _context;
        public DocumentController(ApplicationDbContext context)
        {
            _context = context;
        }
        //create Document
        [HttpPost("CreateTemplate")]
        [HttpPost]
        public async Task<IActionResult> CreateDocumentTemplateAsync(DocumentTemplate template)
        {
            
            {
                if (ModelState.IsValid)
                {
                    Console.WriteLine(template);
                    _context.DocumentTemplates.Add(template);

                    await _context.SaveChangesAsync();
                    return Ok();

                }
                else
                {
                    return BadRequest(new { message = "Template inválido", ModelState });
                }

            }


        }

        //get documents from a municipality
        [HttpGet("GetDocuments")]
        public IActionResult GetDocuments(string municipality)
        {
            var documents = _context.DocumentTemplates;
            var municipalDocuments = documents.Where(d => d.Municipality == municipality);
            return Json(municipalDocuments);
        }

        //create Document Request
        [HttpPost("CreateRequest")]
        public async Task<IActionResult> CreateDocumentRequestAsync(DocumentRequest request)
        {
            if (ModelState.IsValid)
            {
                Console.WriteLine(request);
                _context.DocumentRequests.Add(request);
                await _context.SaveChangesAsync();
                return Ok();

            }
            else
            {
                return BadRequest(new { message = "Pedido inválido", ModelState });
            }

        }

        //get requests from a municipality
        [HttpGet("GetRequestsFromMunicipality")]
        public IActionResult GetRequestsFromMunicipality(string municipality)
        {
            var requests = _context.DocumentRequests;
            var municipalRequests = requests.Where(r => r.Municipality == municipality);
            return Json(municipalRequests);
        }

        //get requests from a citizen
        public IActionResult GetRequestsFromCitizen(string citizen)
        {
            var requests = _context.DocumentRequests;
            var citizenRequests = requests.Where(r => r.CitizenId == citizen);
            return Json(citizenRequests);
        }


        public IActionResult GetTemplatesFromMunicipality(string municipality)
        {
            var templates = _context.DocumentTemplates;
            var municipalTemplates = templates.Where(t => t.Municipality == municipality);
            return Json(municipalTemplates);
        }

    }
}
