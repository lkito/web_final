using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFinalApp.Models
{
    public class ImageInputs
    {
        public class Image
        {
            public string ImagePath { get; set; }
            public bool IsMainImage { get; set; }
            public List<string> ImageTags { get; set; }
            public string ImageType { get; set; }
        }

    }
}
