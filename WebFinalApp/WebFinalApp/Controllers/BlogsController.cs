﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFinalDB.Models;
using System.Data.Entity;

namespace WebFinalApp.Controllers
{
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly WebFinalContext db;
        public BlogsController()
        {
            db = new WebFinalContext();
            db.Configuration.LazyLoadingEnabled = true;
        }

        // GET api/blogs
        [HttpGet("api/[controller]")]
        public ActionResult<List<BlogResults.Blog>> Get()
        {
            return db.Blogs.Include(b => b.Images).ToList().Select(e => new BlogResults.Blog(e)).ToList();
        }

        // GET blog previews
        [HttpGet("api/blogs/GetBlogPreviews")]
        public ActionResult<List<BlogResults.BlogPreview>> GetBlogPreviews([FromQuery(Name = "skip")] int skip, [FromQuery(Name = "take")] int take, [FromQuery(Name = "title")] string title,
                                                                           [FromQuery(Name = "dateFrom")] DateTime? dateFrom, [FromQuery(Name = "dateTo")] DateTime? dateTo)
        {
            var query = db.Blogs.Include(b => b.Images);
            if (dateFrom.HasValue)
            {
                dateFrom = dateFrom.Value.Date;
                query = query.Where(e => e.DateCreated >= dateFrom);
            }
            if (dateTo.HasValue)
            {
                dateTo = dateTo.Value.Date.AddDays(1).AddTicks(-1);
                query = query.Where(e => e.DateCreated <= dateTo);
            }
            if (!string.IsNullOrEmpty(title))
            {
                var keyWords = title.ToLower().Split(' ');
                query = query.Where(e => keyWords.All(word => e.BlogTitle.ToLower().Contains(word)));
            }
            return query.OrderByDescending(c => c.DateCreated)
                .Skip(skip).Take(take).ToList().Select(e => new BlogResults.BlogPreview(e)).ToList();
        }

        // GET api/blogs/5
        [HttpGet("api/[controller]/{id}")]
        public ActionResult<BlogResults.Blog> Get(int id)
        {
            return new BlogResults.Blog(db.Blogs.Include(b => b.Images).FirstOrDefault(e => e.Id == id));
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
