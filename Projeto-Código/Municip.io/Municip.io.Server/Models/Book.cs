namespace Municip.io.Server.Models
{
    public class Book
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string[] Author { get; set; }

        public string Publisher { get; set; }

        public string? ISBN { get; set; }

        public string[] Genre { get; set; }

        public string Sinopsis { get; set; }

        public string CoverImage { get; set; }

        public string Language { get; set; }

        public string Edition { get; set; }

        public DateTime PublicationDate { get; set; }

        public int Copies { get; set; }

        public int AvailableCopies { get; set; }

        public BookStatus Status { get; set; }
        public string Municipality { get; set; }
    }
}
