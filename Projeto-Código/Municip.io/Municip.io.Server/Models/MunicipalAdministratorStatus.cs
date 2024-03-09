namespace Municip.io.Server.Models
{
    public enum MunicipalAdministratorStatus
    {

        Approved,
        Pending,
        Blocked
    }

    public static class MunicipalAdministratorStatusExtensions
    {
        public static string toString(this MunicipalAdministratorStatus me)
        {
            switch (me)
            {
                case MunicipalAdministratorStatus.Approved:
                    return "Aprovado";
                case MunicipalAdministratorStatus.Pending:
                    return "Por Aprovar";
                case MunicipalAdministratorStatus.Blocked:
                    return "Bloqueado";

                default:
                    return "Desconhecido";
            }
        }
    }
}
