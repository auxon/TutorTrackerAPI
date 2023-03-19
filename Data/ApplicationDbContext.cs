using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TutorTracker.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            
        }

        // Define your entity sets and their properties here
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Tutor> Tutors { get; set; } = default!;
        public DbSet<Appointment> Appointments { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appointment>()
                .HasOne<User>(a => a.Student)
                .WithMany(u => u.Appointments)
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Appointment>()
                .HasOne<Tutor>()
                .WithMany()
                .HasForeignKey(a => a.TutorId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Tutor>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey("UserId")
                .IsRequired();

            modelBuilder.Entity<User>().HasKey(u => u.Id);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.FirstName).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.LastName).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
          
            modelBuilder.Entity<Tutor>().HasKey(t => t.Id);
            modelBuilder.Entity<Tutor>().Property(t => t.UserId).IsRequired();
            modelBuilder.Entity<Tutor>().Property(t => t.HourlyRate).HasPrecision(8).IsRequired();
            modelBuilder.Entity<Tutor>().Property(t => t.Subject).IsRequired();
          
            modelBuilder.Entity<Appointment>().HasKey(a => a.Id);
            modelBuilder.Entity<Appointment>().Property(a => a.TutorId).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.StudentId).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.StartTime).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.EndTime).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.Amount).HasPrecision(8).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.Status).IsRequired();
        }
    }
}
