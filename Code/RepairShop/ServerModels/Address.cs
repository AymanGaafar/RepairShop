namespace RepairShop.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [ComplexType]
    public partial class Address
    {
        [StringLength(256)]
        //[Column("Line1")]
        [Index("IX_Address_Line1")]
        [Display(Name = "Line 1")]
        public string Line1 { get; set; }

        [StringLength(256)]
        //[Column("Line2")]
        [Index("IX_Address_Line2")]
        [Display(Name = "Line 2")]
        public string Line2 { get; set; }

        [StringLength(256)]
        //[Column("Line3")]
        [Index("IX_Address_Line3")]
        [Display(Name = "Line 3")]
        public string Line3 { get; set; }

        [StringLength(20)]
        //[Column("PostalCode")]
        [Index("IX_Address_PostalCode")]
        [Display(Name = "Postal Code")]
        public string PostalCode { get; set; }

        [StringLength(256)]
        //[Column("City")]
        [Index("IX_Address_City")]
        [Display(Name = "City")]
        public string City { get; set; }

        [StringLength(256)]
        //[Column("GoverningDistrict")]
        [Index("IX_Address_GoverningDistrict")]
        [Display(Name = "Governing District")]
        public string GoverningDistrict { get; set; }

        [StringLength(256)]
        //[Column("Country")]
        [Index("IX_Address_Country")]
        [Display(Name = "Country")]
        public string Country { get; set; }
    }
}
