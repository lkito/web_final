using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFinalDB.Models;

namespace WebFinalApp.Controllers
{
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly WebFinalContext db;
        public BlogsController()
        {
            db = new WebFinalContext();
        }

        // GET api/blogs
        [HttpGet("api/[controller]")]
        public ActionResult<List<BlogResults.Blog>> Get()
        {
            return db.Blogs.ToList().Select(e => new BlogResults.Blog(e)).ToList();
        }

        // GET api/blogs/5
        [HttpGet("api/[controller]/{id}")]
        public ActionResult<BlogResults.Blog> Get(int id)
        {
            return new BlogResults.Blog(db.Blogs.FirstOrDefault(e => e.Id == id));
        }

        // GET api/blogs/GetBlogImages/5
        [HttpGet("api/blogs/GetBlogImages/{blogId}")]
        public ActionResult<List<BlogResults.Image>> GetBlogImages(int blogId)
        {
            return db.Images.Where(i => i.BlogId == blogId).ToList().Select(e => new BlogResults.Image(e)).ToList();
        }

        // POST api/blogs
        [HttpPost("api/[controller]")]
        public void Post([FromBody] BlogInputs.Blog blog)
        {
            var newBlog = new Blog
            {
                BlogTitle = blog.BlogTitle,
                BlogBody = blog.BlogBody,
                DateCreated = DateTime.Now
            };
            db.Blogs.Add(newBlog);
            foreach(var img in blog.Images)
            {
                db.Images.Add(new Image
                {
                    BlogId = newBlog.Id,
                    ImagePath = img.ImagePath,
                    IsMainImage = img.IsMainImage
                });
            }
            db.SaveChanges();
        }

        // PUT api/blogs/5
        [HttpPut("api/[controller]/{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/blogs/5
        [HttpDelete("api/[controller]/{id}")]
        public void Delete(int id)
        {
        }
    }
}
