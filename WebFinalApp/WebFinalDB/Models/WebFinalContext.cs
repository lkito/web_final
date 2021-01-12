using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace WebFinalDB.Models
{
    public partial class WebFinalContext : DbContext
    {
        public WebFinalContext()
            : base("name=WebFinalContext")
        {
        }

        public virtual DbSet<Blog> Blogs { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<ImageTag> ImageTags { get; set; }
        public virtual DbSet<ImageType> ImageTypes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>()
                .Property(e => e.BlogTitle)
                .IsUnicode(false);

            modelBuilder.Entity<Blog>()
                .Property(e => e.BlogBody)
                .IsUnicode(false);

            modelBuilder.Entity<Image>()
                .HasMany(e => e.ImageTags)
                .WithRequired(e => e.Image)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ImageTag>()
                .Property(e => e.TagName)
                .IsUnicode(false);

            modelBuilder.Entity<ImageType>()
                .Property(e => e.ImageType1)
                .IsUnicode(false);

            modelBuilder.Entity<ImageType>()
                .HasMany(e => e.Images)
                .WithRequired(e => e.ImageType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ImageType>()
                .HasOptional(e => e.ImageTypes1)
                .WithRequired(e => e.ImageType2);
        }
    }
}
