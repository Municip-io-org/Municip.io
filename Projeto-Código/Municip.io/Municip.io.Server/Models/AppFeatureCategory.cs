namespace Municip.io.Server.Models
{
    public enum AppFeatureCategory
    {
        Documents,
        Events,
        News,
        Transports,
    }
    //string values to it
    public static class AppFeatureCategoryExtensions
    {
        public static string toString(this AppFeatureCategory me)
        {
            switch (me)
            {
                case AppFeatureCategory.Documents:
                    return "Documents";
                case AppFeatureCategory.Events:
                    return "Events";
                case AppFeatureCategory.News:
                    return "News";
                case AppFeatureCategory.Transports:
                    return "Transports";
                default:
                    return "Unknown";
            }
        }
    }
}
