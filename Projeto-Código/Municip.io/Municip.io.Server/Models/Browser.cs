namespace Municip.io.Server.Models
{
    public class Browser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateOnly Date { get; set; }
        public string UserAgent { get; set; }

        public Citizen? Citizen { get; set; }
    }
}
