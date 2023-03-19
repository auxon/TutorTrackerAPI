using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public ICollection<Appointment> Appointments { get; set; }
    public string Password { get; set; }

    public User() { }
    public User(string userName, string password, string firstName, string lastName, string email)
    {
        Username = userName;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }
}

public class Tutor
{
    public Tutor() { }
    public Tutor(int userId, string availability, decimal hourlyRate, string subject)
    {
        UserId = userId;
        Availability = availability;
        HourlyRate = hourlyRate;
        Subject = subject;
    }

    public int Id { get; set; }
    public int UserId { get; set; }
    public string Availability { get; set; }
    public string Subject { get; set; }
    public decimal HourlyRate { get; set; }

}

public class Appointment
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public int TutorId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Status { get; set; }
    public decimal Amount { get; set; }
    public User Student { get; set; }

    public Appointment() { }

    public Appointment(int tutorId, int studentId, DateTime startTime, DateTime endTime, decimal amount, string status)
    {
        TutorId = tutorId;
        StudentId = studentId;
        StartTime = startTime;
        EndTime = endTime;
        Amount = amount;
        Status = status;
    }
}
