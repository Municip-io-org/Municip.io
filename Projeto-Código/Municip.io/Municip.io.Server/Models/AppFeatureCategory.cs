namespace Municip.io.Server.Models
{
    public enum AppFeatureCategory
    {
        Documents,
        Events,
        News,
        Transports,
        Library
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
                case AppFeatureCategory.Library:
                    return "Library";
                default:
                    return "Unknown";
            }
        }
    }
}
