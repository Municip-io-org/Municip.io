using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
namespace Municip.io.Server.Controllers
{
    /// <summary>
    /// Controller to manage the status of the document templates
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentTemplateStatusController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public DocumentTemplateStatusController(ApplicationDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Method to activate the document template
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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


        /// <summary>
        /// Method to deactivate the document template
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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


        /// <summary>
        /// Method to remove the document template
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("remove/{id}")]
        public IActionResult Remove(int id)
        {
            var documentTemplate = _context.DocumentTemplates.Find(id);
            if (documentTemplate == null)
            {
                return NotFound();
            }
            if (_context.DocumentRequests.Where(dr => dr.DocumentTemplate.Id == id) == null)
            {
                _context.Remove(documentTemplate);
                _context.SaveChanges();
                return Ok();

            }
            documentTemplate.Status = DocumentTemplateStatus.NotListed;
            _context.SaveChanges();
            return Ok();


        }



    }
}
