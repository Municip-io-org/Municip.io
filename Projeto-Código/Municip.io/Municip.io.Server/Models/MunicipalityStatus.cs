namespace Municip.io.Server.Models
{
    public enum MunicipalityStatus
    {
        Approved,
        Pending,
        Blocked
    }
    //string values to it
    public static class MunicipalityStatusExtensions
    {
        public static string toString(this MunicipalityStatus me)
        {
            switch (me)
            {
                case MunicipalityStatus.Approved:
                    return "Aprovado";
                case MunicipalityStatus.Pending:
                    return "Por Aprovar";
                case MunicipalityStatus.Blocked:
                    return "Bloqueado";
                default:
                    return "Desconhecido";
            }
        }
    }
}
