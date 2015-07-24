namespace RepairShop.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [ComplexType]
    public partial class ContactInfo
    {
        [EmailAddress]
        [StringLength(254)]
        [Index("IX_ContactInfo_EmailAddress")]
        [Display(Name = "Email Address")]
        public string EmailAddress { get; set; }

        [StringLength(20)]
        [Index("IX_ContactInfo_FaxNumber")]
        [Display(Name = "Fax Number")]
        public string FaxNumber { get; set; }

        [Phone]
        [StringLength(20)]
        [Index("IX_ContactInfo_MobileNumber")]
        [Display(Name = "Mobile Number")]
        public string MobileNumber { get; set; }

        [Phone]
        [StringLength(20)]
        [Index("IX_ContactInfo_PhoneNumber")]
        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }
    }
}