namespace RepairShop.Models
{
    using System.Data.Entity;
    using Microsoft.AspNet.Identity.EntityFramework;

    public partial class RepairShopDbContext : IdentityDbContext<User>
    {
        public RepairShopDbContext(): base(Helpers.Configuration.Instance?.GetDbConnection()??"")
        {
        }

        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Condition> Conditions { get; set; }
        public virtual DbSet<Job> Jobs { get; set; }
        public virtual DbSet<JobRepairReason> JobRepairReason { get; set; }
        public virtual DbSet<JobWorkDone> JobWorkDone { get; set; }
        public virtual DbSet<Model> Models { get; set; }
        public virtual DbSet<RepairReason> RepairReasons { get; set; }
        //public override IDbSet<User> Users { get; set; }
        public virtual DbSet<WorkDone> WorkDone { get; set; }


        public static RepairShopDbContext Create()
        {
            return new RepairShopDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ComplexType<Address>()
                .Property(e => e.Line1)
                .IsUnicode(false);

            modelBuilder.ComplexType<Address>()
                .Property(e => e.Line2)
                .IsUnicode(false);

            modelBuilder.ComplexType<Address>()
                .Property(e => e.Line3)
                .IsUnicode(false);

            modelBuilder.ComplexType<Address>()
                .Property(e => e.PostalCode)
                .IsUnicode(false);

            modelBuilder.ComplexType<Address>()
                .Property(e => e.City)
                .IsUnicode(false);

            modelBuilder.ComplexType<Address>()
                .Property(e => e.GoverningDistrict)
                .IsUnicode(false);

            modelBuilder.ComplexType<Address>()
                .Property(e => e.Country)
                .IsUnicode(false);

            modelBuilder.ComplexType<ContactInfo>()
                .Property(e => e.EmailAddress)
                .IsUnicode(false);

            modelBuilder.ComplexType<ContactInfo>()
                .Property(e => e.FaxNumber)
                .IsUnicode(false);

            modelBuilder.ComplexType<ContactInfo>()
                .Property(e => e.MobileNumber)
                .IsUnicode(false);

            modelBuilder.ComplexType<ContactInfo>()
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<IdentityUser>()
                .ToTable("User", "dbo");

            modelBuilder.Entity<User>()
                .ToTable("User", "dbo");

            modelBuilder.Entity<Job>()
                .Property(e => e.Code)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.HelpLink)
                .IsUnicode(false);

            modelBuilder.Entity<Client>()
                .Property(e => e.Code)
                .IsUnicode(false);

            modelBuilder.Entity<Client>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<Client>()
                .Property(e => e.LastName)
                .IsUnicode(false);

            modelBuilder.Entity<Company>()
                .Property(e => e.Name)
                .IsUnicode(false);
            
            modelBuilder.Entity<Condition>()
                .Property(e => e.Name)
                .IsUnicode(false);
            
            modelBuilder.Entity<Job>()
                .Property(e => e.Code)
                .IsUnicode(false);

            modelBuilder.Entity<Job>()
                .Property(e => e.IMEINumber)
                .IsUnicode(false);

            modelBuilder.Entity<Job>()
                .Property(e => e.Notes)
                .IsUnicode(false);

            modelBuilder.Entity<Job>()
                .Property(e => e.Fee)
                .HasPrecision(10, 4);

            //modelBuilder.Entity<Job>()
            //    .HasMany<RepairReason>(j => j.RepairReasons)
            //    .WithMany(r => r.Jobs)
            //    .Map(jr =>
            //    {
            //        jr.MapLeftKey("JobId");
            //        jr.MapRightKey("RepairReasonId");
            //        jr.ToTable("JobRepairReason");
            //    });

            //modelBuilder.Entity<Job>()
            //    .HasMany<WorkDone>(j => j.WorkDone)
            //    .WithMany(w => w.Jobs)
            //    .Map(jw =>
            //    {
            //        jw.MapLeftKey("JobId");
            //        jw.MapRightKey("WorkDoneId");
            //        jw.ToTable("JobWorkDone");
            //    });

            modelBuilder.Entity<Model>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Model>()
                .Property(e => e.HelpLink)
                .IsUnicode(false);

            modelBuilder.Entity<RepairReason>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<RepairReason>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.LastName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.IdNumber)
                .IsUnicode(false);

            modelBuilder.Entity<WorkDone>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<WorkDone>()
                .Property(e => e.Description)
                .IsUnicode(false);
        }
    }
}
