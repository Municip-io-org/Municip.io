using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace Municip.io.Server.Models
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailSender
    {
        [HttpPost("send")]
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
                client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                client.AuthenticateAsync("iomunicip@gmail.com", "gxhn wjic sqsn gjsa");
                client.SendAsync(message);
                client.DisconnectAsync(true);
            }
        }
    }


    public enum UserStatusMessage
    {
        Approve,
        Deny,
        Remove,
        Block,
        Unblock
    }

    public static class UserStatusMessageExtensions
    {
        public static string toString(this UserStatusMessage me)
        {
            switch (me)
            {
                case UserStatusMessage.Approve:
                    return "Depois de avaliarmos o seu pedido, decidimos <span style='font-weight: bold;'>aceitar o pedido de inscrição</span> na nossa plataforma.";
                case UserStatusMessage.Deny:
                    return "Depois de avaliarmos o seu pedido, decidimos <span style='font-weight: bold;'>recusar o pedido de inscrição</span> na nossa plataforma.";
                case UserStatusMessage.Block:
                    return "Decidimos <span style='font-weight: bold;'>bloquear a sua conta</span> na nossa plataforma, disponha dos meios de contacto para qualquer dúvida.";
                case UserStatusMessage.Remove:
                    return "Decidimos <span style='font-weight: bold;'>remover a sua conta</span> da nossa plataforma, disponha dos meios de contacto para qualquer dúvida.";
                case UserStatusMessage.Unblock:
                    return "Decidimos <span style='font-weight: bold;'>desbloquear a sua conta</span> na nossa plataforma.";

                default:
                    return "Desconhecido";
            }
        }
    }


    public enum MunicipalityStatusMessage
    {
        Approve,
        Deny,
        Remove
    }

    public static class MunicipalityStatusMessageExtensions
    {
        public static string toString(this MunicipalityStatusMessage me)
        {
            switch (me)
            {
                case MunicipalityStatusMessage.Approve:
                    return "Depois de avaliarmos o seu pedido, decidimos <span style='font-weight: bold;'>aceitar a inscrição da sua Câmara</span> na nossa plataforma.";
                case MunicipalityStatusMessage.Deny:
                    return "Depois de avaliarmos o seu pedido, decidimos <span style='font-weight: bold;'>recusar a inscrição da sua Câmara</span> na nossa plataforma.";
                case MunicipalityStatusMessage.Remove:
                    return "Uma vez que o seu município foi removido da nossa plataforma, <span style='font-weight: bold;'>a sua conta será também romovida</span> da nossa plataforma. Disponha dos meios de contacto para qualquer dúvida.";

                default:
                    return "Desconhecido";
            }
        }
    }

}
