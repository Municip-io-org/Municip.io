using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    /// <summary>
    /// Controller to manage the documents
    /// </summary>
    [ApiController]
    [Route("api/documents")]

    public class DocumentController : Controller
    {

        private readonly ApplicationDbContext _context;
        public DocumentController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Method to create a document template
        /// </summary>
        /// <param name="template"></param>
        /// <returns></returns>
        [HttpPost("CreateTemplate")]
        public async Task<IActionResult> CreateDocumentTemplateAsync(DocumentTemplate template)
        {

            {
                if (ModelState.IsValid)
                {
                    template.Status = DocumentTemplateStatus.Active;
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


        /// <summary>
        /// Method to edit a document template
        /// </summary>
        /// <param name="template"></param>
        /// <param name="id"></param>
        /// <returns></returns>        
        [HttpPost("EditTemplate")]
        public async Task<IActionResult> EditDocumentTemplateAsync(DocumentTemplate template, int id)
        {
            if (ModelState.IsValid)
            {
                var templateToEdit = await _context.DocumentTemplates.FirstOrDefaultAsync(t => t.Id == id);
                if (templateToEdit == null) return BadRequest(new { message = "Não foi encontrado nenhum modelo de documento", ModelState });

                templateToEdit.Name = template.Name;
                templateToEdit.Description = template.Description;
                templateToEdit.Type = template.Type;
                templateToEdit.TextTemplate = template.TextTemplate;
                templateToEdit.Price = template.Price;

                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Template inválido", ModelState });
            }
        }


        /// <summary>
        /// Method to change the status of a document template to active
        /// </summary>
        /// <param name="id"></param>
        /// <param name="link"></param>
        /// <returns></returns>
        [HttpPost("SendLinkPayment")]
        public async Task<IActionResult> SendLinkPayment(int id, string link)
        {
            var request = await _context.DocumentRequests.FirstOrDefaultAsync(r => r.Id == id);
            if (request == null) return BadRequest(new { message = "Não foi encontrado nenhum pedido", ModelState });

            request.PaymentUrl = link;
            await _context.SaveChangesAsync();
            return Ok();

        }






        /// <summary>
        /// Method to change the status of a document template to active
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns></returns>
        [HttpGet("GetDocuments")]
        public IActionResult GetDocuments(string municipality)
        {
            var documents = _context.DocumentTemplates;
            var municipalDocuments = documents.Where(d => d.Municipality == municipality);
            return Json(municipalDocuments);
        }

        /// <summary>
        /// Method to create a document request
        /// </summary>
        /// <param name="email"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("CreateRequest")]
        public async Task<IActionResult> CreateDocumentRequestAsync(string email, DocumentRequest request)
        {
            if (ModelState.IsValid)
            {

                var citizen = await _context.Citizens.FirstOrDefaultAsync(c => c.Email == email);


                if (citizen == null) return BadRequest(new { message = "Não foi encontrado nenhum cidadão", ModelState });


                var documentTemplate = await _context.DocumentTemplates.FirstOrDefaultAsync(c => c.Id == request.DocumentTemplate.Id);


                if (documentTemplate == null) return BadRequest(new { message = "Não foi encontrado nenhum modelo de documento", ModelState });

                request.Citizen = citizen;
                request.DocumentTemplate = documentTemplate;


                _context.DocumentRequests.Add(request);
                await _context.SaveChangesAsync();

                return Ok();

            }
            else
            {
                return BadRequest(new { message = "Pedido inválido", ModelState });
            }

        }

        /// <summary>
        /// Method to get the requests from a municipality
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns></returns>
        [HttpGet("GetRequestsFromMunicipality")]
        public IActionResult GetRequestsFromMunicipality(string municipality)
        {
            var requests = _context.DocumentRequests;
            var municipalRequests = requests.Include(r => r.Citizen).Include(r => r.DocumentTemplate).Where(r => r.Municipality == municipality);
            return Json(municipalRequests);
        }

        /// <summary>
        /// Obtem os pedidos de um cidadão
        /// <param name="email"></param>"
        /// <returns>O json dos requests do cidadão</returns>
        [HttpGet("GetRequestsFromCitizen")]
        public IActionResult GetRequestsFromCitizen(string email)
        {
            var citizen = _context.Citizens.FirstOrDefault(c => c.Email == email);

            if (citizen == null) return BadRequest(new { message = "O não existe nenhum cidadão", ModelState });

            var requests = _context.DocumentRequests;

            var citizenRequests = requests.Include(r => r.DocumentTemplate).Where(r => r.Citizen.Email == email);

            return Json(citizenRequests);
        }

        /// <summary>
        /// Method to get the templates from a municipality
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns></returns>
        [HttpGet("GetTemplatesFromMunicipality")]
        public IActionResult GetTemplatesFromMunicipality(string municipality)
        {
            var templates = _context.DocumentTemplates;
            var municipalTemplates = templates.Where(t => t.Municipality == municipality);
            return Json(municipalTemplates);
        }

        /// <summary>
        /// Method to get the distinct document types from a municipality
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns></returns>
        [HttpGet("GetDistinctDocumentTypesFromMunicipality")]
        public IActionResult GetDistinctDocumentTypesFromMunicipality(string municipality)
        {
            var templates = _context.DocumentTemplates;
            var municipalTemplates = templates.Where(t => t.Municipality == municipality);
            var distinctTypes = municipalTemplates.Select(t => t.Type).Distinct();
            return Json(distinctTypes);
        }

        /// <summary>
        /// Method to get the distinct document types from a municipality
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("ApproveRequest")]
        public async Task<IActionResult> ApproveRequest(int id)
        {
            var request = await _context.DocumentRequests.FirstOrDefaultAsync(r => r.Id == id);
            if (request == null) return BadRequest(new { message = "Não foi encontrado nenhum pedido", ModelState });

            request.Status = DocumentStatus.Approved;
            await _context.SaveChangesAsync();
            return Ok();
        }

        /// <summary>
        /// Method to change the status of a document request to waiting for payment
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("WaitingForPayment")]
        public async Task<IActionResult> WaitingForPayment(int id)
        {
            var request = await _context.DocumentRequests.FirstOrDefaultAsync(r => r.Id == id);
            if (request == null) return BadRequest(new { message = "Não foi encontrado nenhum pedido", ModelState });

            request.Status = DocumentStatus.WaitingForPayment;
            await _context.SaveChangesAsync();
            return Ok();
        }

        /// <summary>
        /// method to change the status of a document request to rejected
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("RejectRequest")]
        public async Task<IActionResult> RejectRequest(int id)
        {
            var request = await _context.DocumentRequests.FirstOrDefaultAsync(r => r.Id == id);
            if (request == null) return BadRequest(new { message = "Não foi encontrado nenhum pedido", ModelState });

            request.Status = DocumentStatus.Rejected;
            await _context.SaveChangesAsync();
            return Ok();
        }




        /// <summary>
        /// method to change the status of a document request to rejected
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        [HttpGet("GetTemplateById")]
        public IActionResult GetTemplateById(int id)
        {
            var template = _context.DocumentTemplates.FirstOrDefault(t => t.Id == id);
            return Json(template);
        }

    }
}
