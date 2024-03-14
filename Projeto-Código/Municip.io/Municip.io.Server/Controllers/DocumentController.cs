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
    }
}
