namespace WebFinalDB.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ImageType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ImageType()
        {
            Images = new HashSet<Image>();
        }

        public int Id { get; set; }

        [Column("ImageType")]
        [Required]
        [StringLength(100)]
        public string ImageType1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Image> Images { get; set; }

        public virtual ImageType ImageTypes1 { get; set; }

        public virtual ImageType ImageType2 { get; set; }
    }
}
