namespace Municip.io.Server.Models
{
    public enum AccountUserEmail
    {
        REGISTER
    }



    public static class AccountUserEmailExtensions
    {
        public static string toString(this AccountUserEmail me)
        {
            switch (me)
            {
               
                case AccountUserEmail.REGISTER:
                    return "Acabou de se <span style='font-weight: bold;'>registar na nossa plataforma com sucesso</span>. Aguarde enquanto a nossa equipa avalia o seu pedido.";
                default:
                    return "Desconhecido";
            }
        }
    }

}
