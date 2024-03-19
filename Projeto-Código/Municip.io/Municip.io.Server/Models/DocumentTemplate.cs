using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Municip.io.Server.Models
{
    public class DocumentTemplate
    {


        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public string Type { get; set; }

        public string TextTemplate { get; set; }

        public float Price { get; set; }

        public string Municipality { get; set; }



        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DocumentTemplateStatus Status { get; set; }

    }
}
