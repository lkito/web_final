using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFinalApp.Models;

namespace WebFinalApp.Controllers
{
    public class OrderInputs
    {
        public class Order
        {
            public List<string> Tags { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
            public string Description { get; set; }
            public string OrderType { get; set; }
            public string ImgLink { get; set; }
        }
    }
}
