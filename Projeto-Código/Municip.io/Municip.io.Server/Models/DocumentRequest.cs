namespace Municip.io.Server.Models
{
    public class DocumentRequest
    {
        public int Id { get; set; }
        
        public int DocumentTemplateId { get; set; }
        public string Name { get; set; }

        public Citizen Citizen { get; set; }

        public string Municipality { get; set; }

        public DocumentStatus Status { get; set; }

        public DateTime Date { get; set; }
    }
}
