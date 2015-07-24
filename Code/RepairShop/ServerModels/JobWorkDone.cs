namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("JobWorkDone")]
    public partial class JobWorkDone
    {
        [Key]
        [Column(Order = 0)]
        public Guid JobId { get; set; }

        [Key]
        [Column(Order = 1)]
        public Guid WorkDoneId { get; set; }

        [ForeignKey("JobId")]
        public virtual Job Job { get; set; }
        [ForeignKey("WorkDoneId")]
        public virtual WorkDone WorkDone { get; set; }
    }
}
