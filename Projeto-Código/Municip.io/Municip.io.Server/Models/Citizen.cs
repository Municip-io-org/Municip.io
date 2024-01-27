namespace Municip.io.Server.Models
{
 
    /// <summary>
    /// Classe que representa o cidadão
    /// </summary>
    public class Citizen
    {
        
        public Guid Id { get; set; }

        public string firstName { get; set; }
        public string Surname { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
       
        public string Nif { get; set; }
        public string Gender{ get; set; }
        public string Municipality { get; set; }
        public string Address { get; set; }
        public string postalCode1 { get; set; }

        public string postalCode2 { get; set; }

        public DateTime birthDate { get; set; }

        public string photo { get; set; }
    }
}
