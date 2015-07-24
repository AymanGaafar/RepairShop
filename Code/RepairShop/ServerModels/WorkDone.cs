namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("WorkDone")]
    public partial class WorkDone
    {
        public WorkDone()
        {
            //Jobs = new HashSet<Job>();
            JobWorkDone = new HashSet<JobWorkDone>();
        }

        public Guid WorkDoneId { get; set; }

        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        [StringLength(3999)]
        public string Description { get; set; }

        //public virtual ICollection<Job> Jobs { get; set; }

        [InverseProperty("WorkDone")]
        public virtual ICollection<JobWorkDone> JobWorkDone { get; set; }
    }
}
