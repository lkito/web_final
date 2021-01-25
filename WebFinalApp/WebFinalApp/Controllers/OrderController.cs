using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFinalApp.Models;
using WebFinalDB.Models;
using System.Data.Entity;
using MimeKit;
using MailKit.Net.Smtp;

namespace WebFinalApp.Controllers
{
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly WebFinalContext db;
        public OrderController()
        {
            db = new WebFinalContext();
            db.Configuration.LazyLoadingEnabled = true;
        }

        [HttpPost("api/order/SubmitOrder")]
        public void SubmitOrder([FromBody] OrderInputs.Order order)
        {
            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress("User", order.Email);
            message.From.Add(from);

            MailboxAddress to = new MailboxAddress("User", order.Email);
            message.To.Add(to);

            message.Subject = "Order submitted from " + order.PhoneNumber;

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.TextBody = @"Details of your order:
    Phone number: " + order.PhoneNumber + @"
    Email: " + order.Email + @"
    Order type: " + order.OrderType;
            if (order.ImgLink != "") {
                bodyBuilder.TextBody += @"
    Image link: " + order.ImgLink; 
            }
            bodyBuilder.TextBody += @"
    Order tags: ";
            foreach(var tag in order.Tags)
            {
                bodyBuilder.TextBody += tag;
                if (order.Tags.Last() == tag)
                {
                    bodyBuilder.TextBody += ".";
                } else
                {
                    bodyBuilder.TextBody += ", ";
                }
            }
            bodyBuilder.TextBody += "\n    Additional information: " + order.Description;
            bodyBuilder.TextBody += "\n\n    Please wait, the chef will contact you soon!";

            message.Body = bodyBuilder.ToMessageBody();
            SmtpClient client = new SmtpClient();
            client.Connect("smtp.gmail.com", 465, true);
            client.Authenticate(Constants.UserName, Constants.Password);

            client.Send(message);
            client.Disconnect(true);
            client.Dispose();
        }

    }
}
