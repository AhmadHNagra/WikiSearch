using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace WikiSearch.Models
{
    public partial class WikiSearchContext : DbContext
    {
        public DbSet<SearchHistory> SearchHistories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=WikiSearch;Trusted_Connection=True;");
            }
        }
    }
}
