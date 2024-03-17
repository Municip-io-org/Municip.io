using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
namespace Municip.io.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentTemplateStatusController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public DocumentTemplateStatusController(ApplicationDbContext context)
        {
            _context = context;
        }


        //put the state of the document template active
        [HttpPut("activate")]
        public IActionResult Activate(int id)
        {
            var documentTemplate = _context.DocumentTemplates.Find(id);
            if (documentTemplate == null)
            {
                return NotFound();
            }
            documentTemplate.Status = DocumentTemplateStatus.Active;
            _context.SaveChanges();
            return Ok();
        }


        //put the state of the document template inactive
        [HttpPut("deactivate")]
        public IActionResult Deactivate(int id)
        {
            var documentTemplate = _context.DocumentTemplates.Find(id);
            if (documentTemplate == null)
            {
                return NotFound();
            }
            documentTemplate.Status = DocumentTemplateStatus.Inactive;
            _context.SaveChanges();
            return Ok();
        }


        // remove the document template from the list
        [HttpDelete("remove/{id}")]
        public IActionResult Remove(int id)
        {
            var documentTemplate = _context.DocumentTemplates.Find(id);
            if (documentTemplate == null)
            {
                return NotFound();
            }
            //if there is not one document request with this template, then remove it
            if (_context.DocumentRequests.Find(id) == null)
            {
                _context.Remove(documentTemplate);
                _context.SaveChanges();
                return Ok();

            }
            //if there is one or more document request with this template, then set the status to NotListed
            documentTemplate.Status = DocumentTemplateStatus.NotListed;
            _context.SaveChanges();
            return Ok();


        }



    }
}
