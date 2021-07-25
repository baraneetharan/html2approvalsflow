using System.ComponentModel.DataAnnotations;

namespace html2approvalsflow.Models
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

    }
}