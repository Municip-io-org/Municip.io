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
                    return "Documentos";
                case AppFeatureCategory.Events:
                    return "Eventos";
                case AppFeatureCategory.News:
                    return "Notícias";
                case AppFeatureCategory.Transports:
                    return "Transportes";
                default:
                    return "Desconhecido";
            }
        }
    }
}
