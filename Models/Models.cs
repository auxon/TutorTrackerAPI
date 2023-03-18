public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public User(string userName, string firstName, string lastName, string email) {
      Username = userName;
      FirstName = firstName;
      LastName = lastName;
      Email = email;
    }
}

public class Tutor
{
    public Tutor(User user, string availability, decimal hourlyRate, string subject)
    {
        User = user;
        Availability = availability;
        HourlyRate = hourlyRate;
        Subject = subject;
    }

    public int Id { get; set; }
    public User User { get; set; }
    public string Availability { get; set; }
    public string Subject { get; set; }
    public decimal HourlyRate { get; set; }
}

public class Appointment
{
    public int Id { get; set; }
    public User Student { get; set; }
    public Tutor Tutor { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Status { get; set; }
    public decimal Amount { get; set; }

    public Appointment(Tutor tutor, User student, DateTime startTime, DateTime endTime, decimal amount, string status)
    {
        Tutor = tutor;
        Student = student;
        StartTime = startTime;
        EndTime = endTime;
        Amount = amount;
        Status = status;
    }
}
