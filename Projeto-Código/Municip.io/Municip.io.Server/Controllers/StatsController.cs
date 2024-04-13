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

        /// <summary>
        /// Esta função retorna todos os cidadãos como json.
        /// </summary>
        /// 
        /// <returns>O Json de todos os cidadãos</returns>
        [HttpGet("getAllCitizens")]
        public IActionResult getAllCitizens()
        {
            return Ok(_context.Citizens);
        }

        /// <summary>
        /// Obtem todos os administradores municipais
        /// </summary>
        /// <returns>O json com todos os administradores municipais</returns>
        [HttpGet("getAllMunicipalAdmins")]
        public IActionResult getAllMunicipalAdmins()
        {
            return Ok(_context.MunicipalAdministrators);
        }

        /// <summary>
        /// Obtem todos os municípios
        /// </summary>
        /// <returns>O json com todos os municípios</returns>
        [HttpGet("getAllMunicipalities")]
        public IActionResult getAllMunicipalities()
        {
            return Ok(_context.Municipalities);
        }

        /// <summary>
        /// Obtem todos os pedidos de documentos
        /// </summary>
        /// <returns>O json com todos os doumentos</returns>
        [HttpGet("getAllDocumentRequests")]
        public IActionResult getAllDocuments()
        {
            return Ok(_context.DocumentRequests);
        }
        /// <summary>
        /// Obtem todas as notícias
        /// </summary>
        /// <returns>O json com as notícias</returns>
        [HttpGet("getAllNews")]
        public IActionResult getAllNews()
        {
            return Ok(_context.News);
        }

        /// <summary>
        /// Obtem todos os eventos
        /// </summary>
        /// <returns>O json com os eventos</returns>
        [HttpGet("getAllEvents")]
        public IActionResult getAllEvents()
        {
            return Ok(_context.Events);
        }
        /// <summary>
        /// O método abaixo é utilizado para obter o número de cidadãos para a página inicial
        /// </summary>
        /// <returns>O número cidadãos</returns>
        [HttpGet("getLandingPageCitizens")]
        public IActionResult getLandingPageCitizens()
        {
            return Ok(_context.Citizens.Count());

        }

        /// <summary>
        /// O método abaixo é utilizados para obter informações para obter o número de administradores municipais para a página inicial
        /// </summary>
        /// <returns>A contagem de municípios</returns>
        [HttpGet("getLandingPageMunicipalities")]
        public IActionResult getLandingPageMunicipalities()
        {
            return Ok(_context.Municipalities.Count());
        }

        /// <summary>
        /// O método abaixo é utilizado para obter informações para obter o número de pedidos de documentos para a página inicial
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns>O número de municípios</returns>
        [HttpGet("getPendingRequestsByMunicipality")]
        public IActionResult getPendingRequestsByMunicipality(string municipality)
        {
            return Ok(_context.DocumentRequests.Where(x => x.Municipality == municipality && x.Status == Models.DocumentStatus.Pending).Count());
        }

        /// <summary>
        /// Obtem o número de pedidos de documentos à espera de pagamento
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns>A contagem de pedidos à espera de pagamento</returns>
        [HttpGet("getWaitingForPaymentRequestsByMunicipality")]
        public IActionResult getWaitingForPaymentRequestsByMunicipality(string municipality)
        {
            return Ok(_context.DocumentRequests.Where(x => x.Municipality == municipality && x.Status == Models.DocumentStatus.WaitingForPayment).Count());
        }

        /// <summary>
        /// Obtem o todos os livros
        /// </summary>
        /// <returns>o json com os livros</returns>
        [HttpGet("getAllBooks")]
        public IActionResult getAllBooks()
        {
            return Ok(_context.Books);
        }
    }
}
