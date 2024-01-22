using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Municip.io.Server.Controllers
{
    [ApiController]
    [Route("api/municipio")]
    public class GeoAPIController : Controller
    {
      
      
            private readonly HttpClient _httpClient;
        /// <summary>
        /// Construtor com injeção de dependências.
        /// </summary>
        /// <param name="httpClientFactory"></param>
            public GeoAPIController(IHttpClientFactory httpClientFactory)
            {
                _httpClient = httpClientFactory.CreateClient();
                _httpClient.BaseAddress = new Uri("https://json.geoapi.pt/");
            }


        /// <summary>
        /// Informação do municipio pelo nome. Pede à api
        /// </summary>
        /// <param name="nomeMunicipio"></param>
        /// <returns>JSON</returns>
            [HttpGet("{nomeMunicipio}")]
            public async Task<IActionResult> ObterInformacoesMunicipio(string nomeMunicipio)
            {
                var response = await _httpClient.GetAsync($"municipio/{nomeMunicipio}");

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var informacoesMunicipio = JsonSerializer.Deserialize<InformacoesMunicipio>(content);
                    return Ok(informacoesMunicipio);
                }

                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }
        }

    }

