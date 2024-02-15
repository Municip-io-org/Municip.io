namespace Municip.io.Server.Models
{
    public class News
    {
        public Guid Id { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
        public string mainText { get; set; }
        public string image { get; set; }
        public DateTime? date { get; set; }
        public string publisher { get; set; }
        public string Municipality { get; set; }

    }
}
