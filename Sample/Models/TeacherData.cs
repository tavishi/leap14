using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sample.Models
{
     [Table("TeacherData")]
    public class TeacherData
    {
         [Key]
        public int TCH_MALE { get; set; }
        public int TCH_FEMALE { get; set; }

        public string HETCHNAME { get; set; }

        public int GRADPROFABOVE { get; set; }



    }
}