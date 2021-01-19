using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFinalDB.Models;

namespace WebFinalApp.Models
{
    public class ImageResults
    {
        public class Image
        {
            public Image(WebFinalDB.Models.Image img)
            {
                ImagePath = img.ImagePath;
                IsMainImage = img.IsMainImage;
                DateCreated = img.DateCreated;
            }
            public string ImagePath { get; set; }
            public bool IsMainImage { get; set; }
            public DateTime DateCreated { get; set; }
        }
        public class GalleryImage
        {
            public GalleryImage(WebFinalDB.Models.Image img)
            {
                ImagePath = img.ImagePath;
                DateCreated = img.DateCreated;
                BlogId = img.BlogId;
                ImageType = img.ImageType.Type;
                ImageTags = img.ImageTags.Select(e => e.TagName).ToList();
            }
            public string ImagePath { get; set; }
            public DateTime DateCreated { get; set; }
            public int? BlogId { get; set; }
            public string ImageType { get; set; }
            public List<string> ImageTags { get; set; }
        }
        public class GalleryImageLists
        {
            public List<GalleryImage> CakeImages { get; set; }
            public List<GalleryImage> DecorImages { get; set; }
            public List<GalleryImage> CookieImages { get; set; }
        }
    }
}
