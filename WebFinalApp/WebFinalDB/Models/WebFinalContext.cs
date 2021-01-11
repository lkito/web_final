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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>()
                .Property(e => e.BlogTitle)
                .IsUnicode(false);

            modelBuilder.Entity<Blog>()
                .Property(e => e.BlogBody)
                .IsUnicode(false);
        }
    }
}
