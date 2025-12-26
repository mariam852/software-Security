using Microsoft.EntityFrameworkCore;
using xsslabs.models;

namespace xsslabs.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<StoredMessage> StoredMessages { get; set; }
    }
}
