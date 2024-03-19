using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    // <summary>
    /// Controller para os eventos
    /// </summary>
    [ApiController]
    [Route("api/appFeature")]
    public class AppFeatureController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AppFeatureController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Esta chamada permite obter todas funcionalidades da aplicação
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAppFeatures")]
        public IActionResult GetAppFeatures(string municipalityName)
        {
            if (string.IsNullOrWhiteSpace(municipalityName))
            {
                return BadRequest(new { Message = "O nome do município é inválido." });
            }

            var appFeatures = _context.AppFeatures
                .Where(e => e.Municipality == municipalityName)
                .Select(e => new
                {
                    Id = e.Id,
                    AppFeatureCategory = e.AppFeatureCategory.toString(),
                    IsEnabled = e.IsEnabled,
                    Municipality = e.Municipality
                })
                .ToList();

            return Ok(appFeatures);
        }

        /// <summary>
        /// Esta chamada permite atualizar as funcionalidades da aplicação
        /// </summary>
        /// <param name="updateAppFeatures"></param>
        /// <returns></returns>
        [HttpPut("UpdateAppFeatures")]
        public IActionResult UpdateAppFeatures(AppFeature[] appFeatures)
        {
            if (appFeatures == null || appFeatures.Length == 0)
            {
                return BadRequest(new { message = "Nenhuma funcionalidade para atualizar foi fornecida." });
            }

            foreach (var feature in appFeatures)
            {
                var existingFeature = _context.AppFeatures.FirstOrDefault(e => e.Id == feature.Id);

                if (existingFeature == null)
                {
                    return BadRequest(new { message = $"Funcionalidade com o ID {feature.Id} não encontrada." });
                }

                // Atualiza a funcionalidade existente com as novas informações
                existingFeature.IsEnabled = feature.IsEnabled;
            }

            try
            {
                _context.SaveChanges();
                return Ok(new { message = "As funcionalidades foram atualizadas com sucesso." });
            }
            catch (Exception ex)
            {
                // Se ocorrer um erro ao salvar no banco de dados
                return StatusCode(500, new { message = "Ocorreu um erro ao salvar as alterações.", error = ex.Message });
            }
        }
    }   
}
