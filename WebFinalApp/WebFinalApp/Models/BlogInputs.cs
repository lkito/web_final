using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFinalApp.Models;

namespace WebFinalApp.Controllers
{
    public class BlogInputs
    {
        public class Blog
        {
            public int Id { get; set; }
            public string BlogTitle { get; set; }
            public string BlogBody { get; set; }
            public virtual List<ImageInputs.Image> Images { get; set; }
        }
    }
}
