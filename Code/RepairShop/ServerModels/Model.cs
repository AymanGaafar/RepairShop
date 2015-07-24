namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Model")]
    public partial class Model
    {
        public Model()
        {
            Jobs = new HashSet<Job>();
        }

        [Key]
        [Index("IX_ModelId", IsUnique = true)]
        [Display(Name = "Model Id")]
        public Guid ModelId { get; set; }

        [Index("IX_BrandId")]
        [Display(Name = "Brand Id")]
        public Guid BrandId { get; set; }

        [Required]
        [StringLength(50)]
        [Index("IX_Name")]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [StringLength(256)]
        [Index("IX_HelpLink")]
        [Display(Name = "Help Link")]
        public string HelpLink { get; set; }

        [ForeignKey("BrandId")]
        public virtual Brand Brand { get; set; }
        [InverseProperty("Model")]
        public virtual ICollection<Job> Jobs { get; set; }

        [NotMapped]
        [Display(Name = "Full Name")]
        public string FullName
        {
            get
            {
                var companyName = "";
                var brandName = "";

                if(Brand != null)
                {
                    brandName = Brand.Name;

                    if(Brand.Company != null)
                    {
                        companyName = Brand.Company.Name;
                    }
                }

                return String.Join(" ", new object[] 
                { 
                    companyName,
                    brandName,
                    Name
                }); 
            }
        }
    }
}
