using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace Sample.Models
{
    [Table("RteData")]
    public class RteData
    {
        [Key]
        public int SchoolCode { get; set; }
        public int APPROACHBYROAD { get; set; }
        public int WSEC25P_APPLIED { get; set; }
        public int WSEC25P_ENROLLED { get; set; }
        public int TOTALBOYS { get; set; }

        public int TOTALGIRLS { get; set; }
        public int PASSGIRLS { get; set; }
        public int PASSBOYS { get; set; }


    }

}