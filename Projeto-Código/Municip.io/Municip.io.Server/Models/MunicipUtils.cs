namespace Municip.io.Server.Models
{
    public static class MunicipUtils
    {
        public static string ToNameString(this MunicipRole s)
        {

            switch (s)
            {
                case MunicipRole.MUNICIP:
                    return "municipio";
                    break;
                case MunicipRole.CITIZEN:
                    return "cidadao";
                    break;
                case MunicipRole.ADMIN:
                    return "administrador";
                    break;
                default:
                    return s.ToString();
            }
        }
    }
}
