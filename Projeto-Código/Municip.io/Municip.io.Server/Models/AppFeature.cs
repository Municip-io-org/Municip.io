namespace Municip.io.Server.Models
{
    public class AppFeature
    {
        public int Id { get; set; }
        public AppFeatureCategory AppFeatureCategory { get; set; }
        public bool IsEnabled { get; set; }
        public string Municipality { get; set; }
    }
}
