using System.ComponentModel.DataAnnotations;

namespace Municip.io.Server.Models
{
    public class Municipality
    {
        public Guid Id { get; set; }
        [Required]
        [MinLength(10)]
        public string Name { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string District { get; set; }
        
        //etc etc etc


    }
}
