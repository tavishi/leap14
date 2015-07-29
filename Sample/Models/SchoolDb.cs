using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Sample.Models
{
    public class SchoolDb:DbContext
    {
        public SchoolDb() : base("")
{
}
        public DbSet<BasicData> School_basic_data { get; set; }

       public DbSet<GeneralData> School_general_data { get; set; }
       public DbSet<TeacherData> School_teacher_data { get; set; }
       public DbSet<RteData> School_Rte_data{ get; set; }
    
    
    }
}