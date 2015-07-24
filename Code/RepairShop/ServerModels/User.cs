namespace RepairShop.Models
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Runtime.Serialization;
    using System.Security.Claims;
    using System.Threading.Tasks;

    //[Table("User")]
    [DataContract]
    [System.Web.Mvc.Bind(Include = "UserName,Password,FirstName,LastName,IdNumber,BirthDate,Address,ContactInfo")]
    public partial class User : IdentityUser
    {
        public User() : base()
        {
            Address = new Address();
            ContactInfo = new ContactInfo();
            Jobs = new HashSet<Job>();
        }

        private string _DisplayName = "";
        private string _FirstName = "";
        private string _LastName = "";

        [Key]
        [StringLength(128)]
        [Display(Name = "Id")]
        [DataMember]
        public override string Id
        {
            get
            {
                return base.Id;
            }
            set
            {
                base.Id = value;
            }
        }

        [Required]
        [StringLength(256)]
        [Display(Name = "Username")]
        [DataMember]
        public override string UserName
        {
            get
            {
                return base.UserName;
            }
            set
            {
                base.UserName = value;
            }
        }

        [StringLength(256)]
        [Display(Name = "Email")]
        [DataMember]
        public override string Email
        {
            get
            {
                return base.Email;
            }
            set
            {
                base.Email = value;
            }
        }
        
        [Required]
        [StringLength(50)]
        [Index("IX_FirstName")]
        [Display(Name = "First Name")]
        [DataMember]
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
        [DataMember]
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

        [StringLength(256)]
        [Index("IX_IdNumber")]
        [Display(Name = "Id Number")]
        [DataMember]
        public string IdNumber { get; set; }

        [Column(TypeName = "date")]
        [Index("IX_BirthDate")]
        [Display(Name = "Birth Date")]
        [DataMember]
        public DateTime? BirthDate { get; set; }
        
        [DataMember]
        public Address Address { get; set; }

        [DataMember]
        public ContactInfo ContactInfo { get; set; }

        [InverseProperty("WorkDoneBy")]
        [DataMember]
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

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);

            // Add custom user claims here
            return userIdentity;
        }
    }
}
