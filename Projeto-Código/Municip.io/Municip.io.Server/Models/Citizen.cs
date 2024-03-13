using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Municip.io.Server.Models
{
 
    /// <summary>
    /// Classe que representa o cidadão
    /// </summary>
    public class Citizen
    {
        
        public Guid Id { get; set; }

        public string ?firstName { get; set; }
        public string? Surname { get; set; }

        public string? Email { get; set; }

        [NotMapped]
        public string? Password { get; set; }
       
        public string? Nif { get; set; }
        public string? Gender { get; set; }
        public string? Municipality { get; set; }
        public string? Address { get; set; }
        public string? postalCode1 { get; set; }

        public string? postalCode2 { get; set; }

        public DateTime birthDate { get; set; }

        public string? photo { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public CitizenStatus? status { get; set; }

        public DateOnly? date { get; set; }

        // Navigation Properties

        public List<Event>? Events { get; set; }

        public ICollection<Browser> Browsers { get; set; } = new List<Browser>();
    }
}
