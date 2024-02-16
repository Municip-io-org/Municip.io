namespace Municip.io.Server.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; }

        public int Capacity { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime StartRegistration { get; set; }

        public DateTime EndRegistration { get; set; }

        public string Local { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }
    }
}
