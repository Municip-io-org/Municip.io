using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Municip.io.Server.Models
{
    /// <summary>
    /// Classe que representa o administrador municipal
    /// </summary>
    public class MunicipalAdministrator
    {


        public Guid Id { get; set; }

        public String ?firstName { get; set; }
        public String ?Surname { get; set; }
        public String Email { get; set; }

        [NotMapped]
        public String? Password { get; set; }

        

        public String? municipality { get; set; }


        public string? photo { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MunicipalAdministratorStatus status { get; set; }


        public DateOnly? date { get; set; }

        public MunicipalAdministrator(string firstName, string surname, string email, string municipality)
        {
            this.firstName = firstName;
            Surname = surname;
            Email = email;
            this.municipality = municipality;
        }

    }
}
