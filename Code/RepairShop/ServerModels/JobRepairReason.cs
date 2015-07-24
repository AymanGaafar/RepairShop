namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("JobRepairReason")]
    public partial class JobRepairReason
    {
        [Key]
        [Column(Order = 0)]
        public Guid JobId { get; set; }

        [Key]
        [Column(Order = 1)]
        public Guid RepairReasonId { get; set; }

        [ForeignKey("JobId")]
        public virtual Job Job { get; set; }
        [ForeignKey("RepairReasonId")]
        public virtual RepairReason RepairReason { get; set; }
    }
}
