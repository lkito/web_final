namespace WebFinalDB.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ImageTag
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TagName { get; set; }

        public int ImageId { get; set; }

        public virtual Image Image { get; set; }
    }
}
