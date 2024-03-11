namespace Municip.io.Server.Models
{
    public enum AccountUserEmail
    {
        REGISTER,
        NEWLOGIN
    }



    public static class AccountUserEmailExtensions
    {
        public static string toString(this AccountUserEmail me)
        {
            switch (me)
            {
               
                case AccountUserEmail.REGISTER:
                    return "Acabou de se <span style='font-weight: bold;'>registar na nossa plataforma com sucesso</span>. Aguarde enquanto a nossa equipa avalia o seu pedido.";
                case AccountUserEmail.NEWLOGIN:
                    return "Acabou de fazer <span style='font-weight: bold;'>login na nossa plataforma</span>. Se não foi você, por favor, contacte-nos.";
                default:
                    return "Desconhecido";
            }
        }
    }

}
