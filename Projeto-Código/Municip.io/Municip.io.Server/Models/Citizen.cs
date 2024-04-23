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

        public string? firstName { get; set; }
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

        public List<DocumentRequest>? DocumentRequests { get; set; }

        public List<BookRequest>? BookRequests { get; set; }


        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            Citizen other = (Citizen)obj;

            // Compare os atributos relevantes para determinar a igualdade
            return Id == other.Id &&
                   firstName == other.firstName &&
                   Surname == other.Surname &&
                   Email == other.Email &&
                   Nif == other.Nif &&
                   Gender == other.Gender &&
                   Municipality == other.Municipality &&
                   Address == other.Address &&
                   postalCode1 == other.postalCode1 &&
                   postalCode2 == other.postalCode2 &&
                   birthDate == other.birthDate &&
                   photo == other.photo &&
                   status == other.status &&
                   date == other.date;
        }
    }
}
