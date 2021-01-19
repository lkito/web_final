using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFinalApp.Models;

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
                Images = blog.Images.ToList().Select(e => new ImageResults.Image(e)).ToList();
            }
            public int Id { get; set; }
            public string BlogTitle { get; set; }
            public string BlogBody { get; set; }
            public DateTime DateCreated { get; set; }
            public List<ImageResults.Image> Images { get; set; }
        }
        public class BlogPreview
        {
            public BlogPreview(WebFinalDB.Models.Blog blog)
            {
                Id = blog.Id;
                BlogTitle = blog.BlogTitle;
                DateCreated = blog.DateCreated;
                var dbImg = blog.Images.FirstOrDefault(e => e.IsMainImage);
                if(dbImg != null)
                {
                    Image = new ImageResults.Image(dbImg);
                }
            }
            public int Id { get; set; }
            public string BlogTitle { get; set; }
            public DateTime DateCreated { get; set; }
            public ImageResults.Image Image { get; set; }
        }
    }
}
