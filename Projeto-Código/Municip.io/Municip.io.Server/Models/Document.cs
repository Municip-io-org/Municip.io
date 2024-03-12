namespace Municip.io.Server.Models
{
    public class Document
    {
        public int Id { get; set; }

        public DocumentType Type { get; set; }

        public string Name { get; set; }

        public DocumentStatus Status { get; set; }

        public DateTime Date { get; set; }

        public string RequestBy { get; set; }

    }


    public enum DocumentType
    {
        ID,
        Passport,
        DriverLicense,
        Other
    }

    public enum DocumentStatus
    {
        Pending,
        Approved,
        Rejected
    }
}
