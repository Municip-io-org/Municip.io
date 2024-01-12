using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Municip.io.Server.Models
{
    public class MunicipUser: IdentityUser
    {
        [PersonalData]
        [Required]
        public string Role { get; set; }
    }
}
