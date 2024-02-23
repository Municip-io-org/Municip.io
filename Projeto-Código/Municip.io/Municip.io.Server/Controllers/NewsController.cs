using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [ApiController]
    [Route("api/news")]
    public class NewsController : Controller
    {

        private readonly ApplicationDbContext _context;

        public NewsController(ApplicationDbContext context)
        {
            _context = context;
        }

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

        [HttpGet("GetNews")]
        public IActionResult GetNews(string municipality)
        {
            var news = _context.News;
            var municipalNews = news.Where(n => n.Municipality == municipality);
            return Json(municipalNews);
        }

        [HttpPost("DeleteNews")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            /*
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
            }*/
            return Ok();
        }
    }
}
