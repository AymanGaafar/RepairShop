namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Brand")]
    [System.Web.Mvc.Bind(Exclude = "BrandId")]
    public partial class Brand
    {
        public Brand()
        {
            Models = new HashSet<Model>();
        }

        [Key]
        [Index("IX_BrandId", IsUnique = true)]
        [Display(Name = "Brand Id")]
        public Guid BrandId { get; set; }

        [Index("IX_CompanyId")]
        [Display(Name = "Company Id")]
        public Guid CompanyId { get; set; }

        [Required]
        [StringLength(50)]
        [Index("IX_Name")]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [StringLength(3999)]
        [Index("IX_Description")]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [StringLength(256)]
        [Index("IX_HelpLink")]
        [Display(Name = "Help Link")]
        public string HelpLink { get; set; }

        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; }
        [InverseProperty("Brand")]
        public virtual ICollection<Model> Models { get; set; }

        [NotMapped]
        [Display(Name = "Full Name")]
        public string FullName
        {
            get
            {
                var companyName = Company != null ? Company.Name : "";

                return String.Join(" ", new object[] 
                { 
                    companyName,
                    Name
                });
            }
        }
    }
}
