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
}
