using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Municip.io.Server.Models
{
    public class EmailSender
    {
        public static void SendEmail(string email, string subject, string destinyName, string messageText, string filePath)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Municip.io Team", "iomunicip@gmail.com"));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder();


            bodyBuilder.HtmlBody = System.IO.File.ReadAllText(filePath).Replace("{{destinyName}}", destinyName).Replace("{{message}}", messageText);



            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                client.Authenticate("iomunicip@gmail.com", "gxhn wjic sqsn gjsa");
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }


    public enum CitizenStatusMessage
    {
        Approve,
        Deny,
        Remove,
        Block,
        Unblock
    }

    public static class CitizenStatusMessageExtensions
    {
        public static string toString(this CitizenStatusMessage me)
        {
            switch (me)
            {
                case CitizenStatusMessage.Approve:
                    return "Depois de avaliarmos o seu pedido, decidimos aceitar o seu pedido de inscrição na nossa plataforma.";
                case CitizenStatusMessage.Deny:
                    return "Depois de avaliarmos o seu pedido, decidimos  recusar o seu pedido de inscrição na nossa plataforma";
                case CitizenStatusMessage.Block:
                    return "Decidimos bloquear a sua conta na nossa plataforma, disponha dos meios de contacto para qualquer dúvida";
                case CitizenStatusMessage.Remove:
                    return "Decidimos remover a sua conta da nossa plataforma, disponha dos meios de contacto para qualquer dúvida";
                case CitizenStatusMessage.Unblock:
                    return "Decidimos desbloquear a sua conta na nossa plataforma";

                default:
                    return "Desconhecido";
            }
        }
    }

}
