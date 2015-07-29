using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sample.Models
{
     [Table("GeneralData")]
    public class GeneralData
    {
         [Key]
        public int SchoolCode { get; set; }
        public int RURURB { get; set; }
        public int MEDINSTR1 { get; set; }
        public string ESTDYEAR { get; set; }
        public int SCHRES_YN { get; set; }

        public int SCHSHI_YN { get; set; }

        public int CLROOMS { get; set; }

        public int REPAIR { get; set; }
        public int TOILETB { get; set; }
        public int TOILET_G { get; set; }

        public int MEALSINSCH { get; set; }
        public int CAL_YN { get; set; }
        public int ELECTRIC_YN { get; set; }
        public int LIBRARY_YN { get; set; }
        public int COMPUTERS { get; set; }
        public int BOOKINLIB { get; set; }

    }

}