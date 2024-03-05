using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
using System.Diagnostics;

namespace Municip.io.Server.Controllers
{

    /// <summary>
    /// Este controlador é responsável por gerir as notícias.
    /// </summary>
    [ApiController]
    [Route("api/news")]
    public class NewsController : Controller
    {

        private readonly ApplicationDbContext _context;

        public NewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Esta função cria uma notícia. Recebe como parâmetro a notícia.
        /// </summary>
        /// <param name="newNews"></param>
        /// <returns></returns>
        [HttpPost("CreateNews")]
        public async Task<IActionResult> CreateNews(News newNews)
        {
            if (ModelState.IsValid)
            {
                Console.WriteLine(newNews);
                _context.News.Add(newNews);
                await _context.SaveChangesAsync();
                return Ok();
          
            }
            else
            {
                return BadRequest(new { message = "Notícia Inválida", ModelState });
            }

        }

        /// <summary>
        ///  esta função retorna todas as notícias de um município. Recebe como parâmetro o nome do município.
        /// </summary>
        /// <param name="municipality"></param>
        /// <returns></returns>
        [HttpGet("GetNews")]
        public IActionResult GetNews(string municipality)
        {
            var news = _context.News;
            var municipalNews = news.Where(n => n.Municipality == municipality);
            return Json(municipalNews);
        }

        /// <summary>
        /// esta função remove uma notícia. Recebe como parâmetro o id da notícia.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("DeleteNews")]
        public async Task<IActionResult> DeleteNews(Guid id)
        {
            
            var news = await _context.News.FirstOrDefaultAsync(n => n.Id == id);
            if (news != null)
            {
                _context.News.Remove(news);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
        }

        /// <summary>
        /// esta função atualiza uma notícia. Recebe como parâmetro a notícia atualizada.
        /// </summary>
        /// <param name="updatedNews"></param>
        /// <returns></returns>
        [HttpPut("UpdateNews")]
        public async Task<IActionResult> UpdateNews(News updatedNews)
        {
            if (ModelState.IsValid)
            {
                var news = await _context.News.FirstOrDefaultAsync(n => n.Id == updatedNews.Id);
                if (news != null)
                {
                    _context.Entry(news).CurrentValues.SetValues(updatedNews);
                    _context.SaveChanges();
                    
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest(new { message = "Notícia Inválida", ModelState });
            }
        }

        /// <summary>
        /// esta função retorna uma notícia. Recebe como parâmetro o id da notícia.
        /// </summary>
        /// <param name="newsId"></param>
        /// <returns></returns>
        [HttpGet("GetNewsById")]
        public IActionResult GetNewsById(Guid newsId)
        {
            if (!ModelState.IsValid)
            {
                var validationErrors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return BadRequest(new { Message = "Erro de Validação", Errors = validationErrors });
            }

            var newsById = _context.News.Where(e => e.Id == newsId).FirstOrDefault();
            if (newsById == null)
            {
                return NotFound(new { message = "Not Found any event with id: " + newsId });
            }

            return Json(newsById);
        }
    }
}
