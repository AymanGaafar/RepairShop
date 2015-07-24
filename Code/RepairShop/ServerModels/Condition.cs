namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Condition")]
    [System.Web.Mvc.Bind(Exclude = "ConditionId")]
    public partial class Condition
    {
        public Condition()
        {
            Jobs = new HashSet<Job>();
        }

        [Index("IX_ConditionId", IsUnique = true)]
        [Display(Name = "Condition Id")]
        public Guid ConditionId { get; set; }

        [StringLength(50)]
        [Index("IX_Name")]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [InverseProperty("Condition")]
        public virtual ICollection<Job> Jobs { get; set; }
    }
}
