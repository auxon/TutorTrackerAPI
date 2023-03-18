using Microsoft.EntityFrameworkCore;

namespace TutorTracker.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Define your entity sets and their properties here
        public DbSet<Tutor> Tutors { get; set; } = null!;
        public DbSet<Appointment> Appointments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.Id);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.FirstName).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.LastName).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Username);
          
            modelBuilder.Entity<Tutor>().HasKey(t => t.Id);
            modelBuilder.Entity<Tutor>().Property(t => t.User).IsRequired();
            modelBuilder.Entity<Tutor>().Property(t => t.HourlyRate).IsRequired();
            modelBuilder.Entity<Tutor>().Property(t => t.Subject).IsRequired();
          
            modelBuilder.Entity<Appointment>().HasKey(a => a.Id);
            modelBuilder.Entity<Appointment>().Property(a => a.Tutor).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.Student).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.StartTime).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.EndTime).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.Amount).IsRequired();
            modelBuilder.Entity<Appointment>().Property(a => a.Status).IsRequired();
        }
    }
}
