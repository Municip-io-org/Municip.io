using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Municip.io.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly string _apiKey = "AIzaSyBG6nzqVZ5MjockppHITseDjF72nEKnHeQ";

        private readonly HttpClient _httpClient;

        public BookController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
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
    }
}


