using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

public class User : IdentityUser
{
    public string? FirstName { get; set; }   
    public string? LastName { get; set; }
    public ICollection<Appointment>? Appointments { get; set; }
}

public class Tutor
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string Availability { get; set; }
    public string Subject { get; set; }
    public decimal HourlyRate { get; set; }

}

public class Appointment
{
    public int Id { get; set; }
    public string StudentId { get; set; }
    public int TutorId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Status { get; set; }
    public decimal Amount { get; set; }
    public User Student { get; set; }
}
