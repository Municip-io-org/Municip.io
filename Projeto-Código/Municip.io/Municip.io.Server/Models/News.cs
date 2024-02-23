namespace Municip.io.Server.Models
{
    public class News
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string MainText { get; set; }
        public string photo { get; set; }
        public DateTime? Date { get; set; }
        public string Municipality { get; set; }

    }
}
