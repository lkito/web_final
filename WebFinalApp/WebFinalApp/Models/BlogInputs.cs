using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalApp.Controllers
{
    public class BlogInputs
    {
        public class Image
        {
            public string ImagePath { get; set; }
            public bool IsMainImage { get; set; }
            public List<string> ImageTags { get; set; }
            public string ImageType { get; set; }
        }

        public class Blog
        {
            public int Id { get; set; }
            public string BlogTitle { get; set; }
            public string BlogBody { get; set; }
            public virtual List<Image> Images { get; set; }
        }
    }
}
