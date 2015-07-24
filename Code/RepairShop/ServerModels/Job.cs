namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Job")]
    [System.Web.Mvc.Bind(Exclude = "JobId,Code")]
    public partial class Job
    {
        public Job()
        {
            //RepairReasons = new HashSet<RepairReason>();
            //WorkDone = new HashSet<WorkDone>();

            JobRepairReasons = new HashSet<JobRepairReason>();
            JobWorkDone = new HashSet<JobWorkDone>();
        }

        [Key]
        [Index("IX_JobId")]
        [Display(Name = "Job Id")]
        public Guid JobId { get; set; }

        [Required]
        [StringLength(50)]
        [Index("IX_Code")]
        [Display(Name = "Code")]
        public string Code { get; set; }

        [Required]
        [Index("IX_ClientId")]
        [Display(Name = "Client Id")]
        public Guid ClientId { get; set; }

        [Required]
        [StringLength(128)]
        [Index("IX_WorkDoneById")]
        [Display(Name = "Work Done By Id")]
        public string WorkDoneById { get; set; }

        [Required]
        [Index("IX_ModelId")]
        [Display(Name = "Model Id")]
        public Guid ModelId { get; set; }

        [Required]
        [Index("IX_RecievedOn")]
        [Display(Name = "Recieved On")]
        public DateTime RecievedOn { get; set; }

        [Index("IX_IMEINumber")]
        [Display(Name = "IMEI Number")]
        [StringLength(17, MinimumLength=15)]
        //[Components.IMEI]
        public string IMEINumber { get; set; }

        [Index("IX_ConditionId")]
        [Display(Name = "Condition Id")]
        public Guid? ConditionId { get; set; }

        [Index("IX_PhoneSeendWorking")]
        [Display(Name = "Phone Seen Working")]
        public bool? PhoneSeenWorking { get; set; }

        [Index("IX_BatteryWithPhone")]
        [Display(Name = "Battery with Phone")]
        public bool? BatteryWithPhone { get; set; }

        [Index("IX_HasWarranty")]
        [Display(Name = "HasWarranty")]
        public bool? HasWarranty { get; set; }

        [StringLength(3999)]
        [Index("IX_Notes")]
        [Display(Name = "Notes")]
        public string Notes { get; set; }

        [Index("IX_RepairedOn")]
        [Display(Name = "Repaired On")]
        public DateTime? RepairedOn { get; set; }

        [Index("IX_Fee")]
        [Display(Name = "Fee")]
        [Column(TypeName = "smallmoney")]
        public decimal Fee { get; set; }

        [ForeignKey("ClientId")]
        [Display(Name = "Client")]
        public virtual Client Client { get; set; }
        [ForeignKey("ConditionId")]
        [Display(Name = "Condition")]
        public virtual Condition Condition { get; set; }
        [ForeignKey("ModelId")]
        [Display(Name = "Model")]
        public virtual Model Model { get; set; }
        //[Display(Name = "Repair Reasons")]
        //public virtual ICollection<RepairReason> RepairReasons { get; set; }
        //[Display(Name = "Work Done")]
        //public virtual ICollection<WorkDone> WorkDone { get; set; }
        [ForeignKey("WorkDoneById")]
        [Display(Name = "Work Done By")]
        public virtual User WorkDoneBy { get; set; }

        [InverseProperty("Job")]
        public virtual ICollection<JobRepairReason> JobRepairReasons { get; set; }
        [InverseProperty("Job")]
        public virtual ICollection<JobWorkDone> JobWorkDone { get; set; }

        public static string GenerateUniqueCode()
        {
            return "jb-" + Helpers.Helpers.GetUniqueKey();
        }
    }
}
