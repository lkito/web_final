using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFinalApp.Models;
using WebFinalDB.Models;
using System.Data.Entity;

namespace WebFinalApp.Controllers
{
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly WebFinalContext db;
        public ImagesController()
        {
            db = new WebFinalContext();
            db.Configuration.LazyLoadingEnabled = true;
        }

        // GET api/images/GetBlogImages/5
        [HttpGet("api/images/GetBlogImages/{blogId}")]
        public ActionResult<List<ImageResults.Image>> GetBlogImages(int blogId)
        {
            return db.Images.Where(i => i.BlogId == blogId).ToList().Select(e => new ImageResults.Image(e)).ToList();
        }

        // GET api/images/GetBlogImages/5
        [HttpGet("api/images/{imageId}")]
        public ActionResult<ImageResults.GalleryImage> GetImage(int imageId)
        {
            var dbImage = db.Images.FirstOrDefault(i => i.Id == imageId);
            return dbImage == null ? null : new ImageResults.GalleryImage(dbImage);
        }

        // GET api/images/GetBlogImages/5/5
        [HttpGet("api/images/GetGalleryImages")]
        public ActionResult<ImageResults.GalleryImageLists> GetGalleryImages([FromQuery(Name = "filters")] List<string> filters, [FromQuery(Name = "skip")] int skip = 0, [FromQuery(Name = "take")] int take = 10)
        {
            var dbImages = db.Images.Include(c => c.ImageType).Include(d => d.ImageTags).Include(e => e.Blog);
            filters = filters.Select(e => e.Trim().ToLower()).ToList();
            foreach(var tag in filters)
            {
                dbImages = dbImages.Where(e => e.ImageTags.Any(t => t.TagName.Contains(tag)));
            }
            dbImages = dbImages.OrderByDescending(i => i.DateCreated);

            var cakeImages = dbImages.Where(d => d.ImageType.Type == Constants.ImageType.Cake).Skip(skip).Take(take).ToList().Select(e => new ImageResults.GalleryImage(e)).ToList();
            var decorImages = dbImages.Where(d => d.ImageType.Type == Constants.ImageType.Decor).Skip(skip).Take(take).ToList().Select(e => new ImageResults.GalleryImage(e)).ToList();
            var cookieImages = dbImages.Where(d => d.ImageType.Type == Constants.ImageType.Cookies).Skip(skip).Take(take).ToList().Select(e => new ImageResults.GalleryImage(e)).ToList();
            return new ImageResults.GalleryImageLists
            {
                CakeImages = cakeImages,
                DecorImages = decorImages,
                CookieImages = cookieImages,
            };
        }
    }
}
