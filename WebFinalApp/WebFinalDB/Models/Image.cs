namespace WebFinalDB.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Image
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Image()
        {
            ImageTags = new HashSet<ImageTag>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(400)]
        public string ImagePath { get; set; }

        public int? BlogId { get; set; }

        public bool IsMainImage { get; set; }

        public int ImageTypeId { get; set; }

        public DateTime DateCreated { get; set; }

        public virtual Blog Blog { get; set; }

        public virtual ImageType ImageType { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ImageTag> ImageTags { get; set; }
    }
}
