namespace WebFinalDB.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Image
    {
        public int Id { get; set; }

        [Required]
        [StringLength(400)]
        public string ImagePath { get; set; }

        public int? BlogId { get; set; }

        public bool IsMainImage { get; set; }

        public virtual Blog Blog { get; set; }
    }
}
