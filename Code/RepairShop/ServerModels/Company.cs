namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Company")]
    [System.Web.Mvc.Bind(Exclude = "CompanyId")]
    public partial class Company
    {
        public Company()
        {
            Brands = new HashSet<Brand>();
        }

        [Index("IX_CompanyId", IsUnique = true)]
        [Display(Name = "Company Id")]
        public Guid CompanyId { get; set; }

        [Required]
        [StringLength(50)]
        [Index("IX_Name")]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [InverseProperty("Company")]
        public virtual ICollection<Brand> Brands { get; set; }
    }
}
