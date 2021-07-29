using System.ComponentModel.DataAnnotations;

namespace html2approvalsflow.Models
{
    public class ResourceRequest {
        [Key]
        public int Id { get; set; }
        public string candidate { get; set; }
        public string position { get; set; }
        public string team { get; set; }
     }

}