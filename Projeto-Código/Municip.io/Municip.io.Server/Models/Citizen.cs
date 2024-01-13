namespace Municip.io.Server.Models
{
    public class Citizen
    {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
       
        public string Nif { get; set; }
        public string Gender{ get; set; }
        public string Municipality { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }

    
    }
}
