using System.ComponentModel.DataAnnotations;

namespace Municip.io.Server.Models
{
    /// <summary>
    /// Classe que representa o município
    /// </summary>
    public class Municipality
    {
        public Guid Id { get; set; }
        

        public string? name { get; set; }
        public string? president { get; set; }
        public string? contact { get; set; }
        public string? description { get; set; }


        public string? codigo { get; set; }
        public string? nif { get; set; }
        public string? rua { get; set; }
        public string? localidade { get; set; }
        public string? codigopostal { get; set; }
        public string? descrpostal { get; set; }
        public string? email { get; set; }
        public string? telefone { get; set; }
        public string? fax { get; set; }
        public string? sitio { get; set; }
        public string? areaha { get; set; }
        public string? populacao { get; set; }
        public string? eleitores { get; set; }
        public string? codigoine { get; set; }
        public string? nome { get; set; }
        public string? distrito { get; set; }






        //etc etc etc


    }
}
