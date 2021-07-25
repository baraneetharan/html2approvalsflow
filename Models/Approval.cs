using System.ComponentModel.DataAnnotations;

namespace html2approvalsflow.Models
{
    public class Approval
    {
        [Key]
        public int Id { get; set; }
        public string reqid { get; set; }
        public string level { get; set; }
        public string emailto { get; set; }
        public string status { get; set; }
        public string comments { get; set; }

    }
}