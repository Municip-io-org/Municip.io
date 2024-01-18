using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Municip.io.Server
{
    public class GeoAPI
    {


        private readonly HttpClient _httpClient;

        public GeoAPI()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://json.geoapi.pt/");
        }

       
        public async Task<InformacoesMunicipio> ObterInformacoesMunicipio(string nomeMunicipio)
        {
            var response = await _httpClient.GetAsync($"municipio/{nomeMunicipio}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var informacoesMunicipio = JsonSerializer.Deserialize<InformacoesMunicipio>(content);
                return informacoesMunicipio;
            }

            return null;
        }
    }
}

