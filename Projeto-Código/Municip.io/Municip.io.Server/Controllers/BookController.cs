using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Municip.io.Server.Data;
using Municip.io.Server.Models;

namespace Municip.io.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        private readonly HttpClient _httpClient;
        private readonly ApplicationDbContext _context;

        public BookController(IHttpClientFactory httpClientFactory, ApplicationDbContext context)
        {
            _httpClient = httpClientFactory.CreateClient();
            _context = context;
        }

        [HttpGet("GetBookInfoAPI")]
        public async Task<IActionResult> GetBookInfoAPI(string isbn)
        {
            var response = await _httpClient.GetAsync($"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine(content);
                return Content(content, "application/json"); // Retorna o JSON com o tipo de conteúdo definido
            }

            return StatusCode((int)response.StatusCode, response.ReasonPhrase);
        }

        [HttpPost("CreateBook")]
        public IActionResult CreateBook(Book newBook)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (newBook == null)
                    {
                        return BadRequest("O objeto de livro recebido está vazio.");
                    }

                    // Verificar se já existe um livro com o mesmo ISBN e o mesmo município
                    var existingBook = _context.Books.FirstOrDefault(b => b.ISBN == newBook.ISBN && b.Municipality == newBook.Municipality);
                    if (existingBook != null)
                    {
                        // Se já existe um livro com o mesmo ISBN e município, retornar um BadRequest
                        return BadRequest("Já existe um livro com o mesmo ISBN e Município.");
                    }

                    // Adicionar o novo livro ao contexto e salvar as alterações no banco de dados
                    _context.Books.Add(newBook);
                    _context.SaveChanges();

                    // Retornar um Ok para indicar que o livro foi adicionado com sucesso
                    return Ok();
                }

                return BadRequest(new { message = "Modelo inválido", ModelState });
            }
            catch (Exception ex)
            {
                // Lidar com exceções e retornar um código de status de erro
                return StatusCode(500, $"Erro ao criar livro: {ex.Message}");
            }
        }


    }
}


