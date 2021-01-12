using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalApp.Controllers
{
    public class BlogResults
    {
        public class Blog
        {
            public Blog(WebFinalDB.Models.Blog blog)
            {
                Id = blog.Id;
                BlogTitle = blog.BlogTitle;
                BlogBody = blog.BlogBody;
                DateCreated = blog.DateCreated;
            }
            public int Id { get; set; }
            public string BlogTitle { get; set; }
            public string BlogBody { get; set; }
            public DateTime DateCreated { get; set; }
        }
        public class Image
        {
            public Image(WebFinalDB.Models.Image img)
            {
                ImagePath = img.ImagePath;
                IsMainImage = img.IsMainImage;
            }
            public string ImagePath { get; set; }
            public bool IsMainImage { get; set; }
        }
    }
}
