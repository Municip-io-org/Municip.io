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
        public async Task<IActionResult> CreateDocumentRequestAsync(string email, DocumentRequest request)
        {
            if (ModelState.IsValid)
            {
                Console.WriteLine(request);
                var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);

                if(citizen == null) return BadRequest(new { message = "O não existe nenhum cidadão", ModelState });


                request.Citizen = citizen;
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
        [HttpGet("GetRequestsFromCitizen")]
        public IActionResult GetRequestsFromCitizen(string email)
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);

            if (citizen == null) return BadRequest(new { message = "O não existe nenhum cidadão", ModelState });

            var requests = _context.DocumentRequests;
            var citizenRequests = requests.Where(r => r.Citizen.Email == email);
            return Json(citizenRequests);
        }

        [HttpGet("GetTemplatesFromMunicipality")]
        public IActionResult GetTemplatesFromMunicipality(string municipality)
        {
            var templates = _context.DocumentTemplates;
            var municipalTemplates = templates.Where(t => t.Municipality == municipality);
            return Json(municipalTemplates);
        }

    }
}
