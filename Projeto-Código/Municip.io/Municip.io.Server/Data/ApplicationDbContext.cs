using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Municip.io.Server.Models;

namespace Municip.io.Server.Data
{
   
        public class ApplicationDbContext : IdentityDbContext<IdentityUser>
        {

            
        public DbSet<Citizen> Citizens { get; set; }

            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
                base(options)
            { }
        }


    
}
