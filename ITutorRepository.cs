using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TutorTracker.Data;

namespace TutorTracker.Repositories
{
    public interface ITutorRepository
    {
        IEnumerable<Tutor> GetTutors();
        Tutor GetTutor(int id);
        void AddTutor(Tutor tutor);
        void UpdateTutor(Tutor tutor);
        void DeleteTutor(int id);
    }

    public class TutorRepository : ITutorRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public TutorRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Tutor> GetTutors()
        {
            return _dbContext.Tutors.ToList();
        }

        public Tutor GetTutor(int id)
        {
            return _dbContext.Tutors.FirstOrDefault(t => t.Id == id);
        }

        public void AddTutor(Tutor tutor)
        {
            _dbContext.Tutors.Add(tutor);
            _dbContext.SaveChanges();
        }

        public void UpdateTutor(Tutor tutor)
        {
            _dbContext.Entry(tutor).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public void DeleteTutor(int id)
        {
            var tutor = _dbContext.Tutors.Find(id);
            if (tutor != null)
            {
                _dbContext.Tutors.Remove(tutor);
                _dbContext.SaveChanges();
            }
        }
    }

    public interface IAppointmentRepository
    {
        IEnumerable<Appointment> GetAppointments();
        Appointment GetAppointment(int id);
        void AddAppointment(Appointment appointment);
        void UpdateAppointment(Appointment appointment);
        void DeleteAppointment(int id);
    }

    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public AppointmentRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Appointment> GetAppointments()
        {
            return _dbContext.Appointments.ToList();
        }

        public Appointment GetAppointment(int id)
        {
            return _dbContext.Appointments.FirstOrDefault(a => a.Id == id);
        }

        public void AddAppointment(Appointment appointment)
        {
            _dbContext.Appointments.Add(appointment);
            _dbContext.SaveChanges();
        }

        public void UpdateAppointment(Appointment appointment)
        {
            _dbContext.Entry(appointment).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public void DeleteAppointment(int id)
        {
            var appointment = _dbContext.Appointments.Find(id);
            if (appointment != null)
            {
                _dbContext.Appointments.Remove(appointment);
                _dbContext.SaveChanges();
            }
        }
    }
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int id);
        void AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);
    }

    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public User GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
    }
}
