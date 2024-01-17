namespace Municip.io.Server.Models
{
    public class MunicipalAdministrator
    {
        public String firstName { get; set; }
        public String Surname { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public String municipality { get; set; }

        public MunicipalAdministrator(string firstName, string surname, string email, string password, string municipality)
        {
            this.firstName = firstName;
            Surname = surname;
            Email = email;
            Password = password;
            this.municipality = municipality;
        }

    }
}
