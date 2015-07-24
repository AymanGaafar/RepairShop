namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RepairReason")]
    public partial class RepairReason
    {
        public RepairReason()
        {
            //Jobs = new HashSet<Job>();
            JobRepairReasons = new HashSet<JobRepairReason>();
        }

        public Guid RepairReasonId { get; set; }

        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        [StringLength(3999)]
        public string Description { get; set; }

        //public virtual ICollection<Job> Jobs { get; set; }

        [InverseProperty("RepairReason")]
        public virtual ICollection<JobRepairReason> JobRepairReasons { get; set; }
    }
}
