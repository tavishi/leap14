﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Sample.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
     [Table("BasicData")]
    public partial class BasicData
    {
         [Key]
        public int SchoolCode { get; set; }
        public string DistrictName { get; set; }
        public string SchoolName { get; set; }
        public string BlockName { get; set; }
        public string ClusterName { get; set; }
        public string VillageName { get; set; }
        public string Pincode { get; set; }
    }
}