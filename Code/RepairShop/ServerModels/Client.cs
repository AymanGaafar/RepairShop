namespace RepairShop.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Client")]
    [System.Web.Mvc.Bind(Exclude = "ClientId,Code,RegistrationDate")]
    public partial class Client
    {
        public Client()
        {
            Address = new Address();
            ContactInfo = new ContactInfo();
            Jobs = new HashSet<Job>();
        }

        private string _DisplayName = "";
        private string _FirstName = "";
        private string _LastName = "";

        [Key]
        [Index("IX_ClientId")]
        [Display(Name = "Client Id")]
        public Guid ClientId { get; set; }

        [Required]
        [StringLength(50)]
        [Index("IX_Code")]
        [Display(Name = "Code")]
        public string Code { get; set; }

        [Required]
        [StringLength(50)]
        [Index("IX_FirstName")]
        [Display(Name = "First Name")]
        public string FirstName
        {
            get
            {
                return _FirstName;
            }

            set
            {
                _FirstName = value;

                DisplayNameChanged();
            }
        }

        [StringLength(50)]
        [Index("IX_LastName")]
        [Display(Name = "Last Name")]
        public string LastName
        {
            get
            {
                return _LastName;
            }

            set
            {
                _LastName = value;

                DisplayNameChanged();
            }
        }

        [Index("IX_RegistrationDate")]
        [Display(Name = "Registration Date")]
        public DateTime RegistrationDate { get; set; }

        public Address Address { get; set; }
        
        public ContactInfo ContactInfo { get; set; }

        [InverseProperty("Client")]
        public virtual ICollection<Job> Jobs { get; set; }

        [NotMapped]
        public string DisplayName
        {
            get
            {
                return _DisplayName;
            }
        }

        private void DisplayNameChanged()
        {
            _DisplayName = String.Join(" ", new object[] { this.FirstName, this.LastName });
        }

        public static string GenerateUniqueCode()
        {
            return "cl-" + Helpers.Helpers.GetUniqueKey();
        }
    }
}
