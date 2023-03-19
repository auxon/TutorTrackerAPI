import React, { useState, useEffect } from 'react';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({});

  useEffect(() => {
    fetch('https://localhost:7189/api/appointment')
      .then(response => response.json())
      .then(data => setAppointments(data));
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleCreateAppointment = () => {
    fetch('https://localhost:7189/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment)
    })
      .then(response => response.json())
      .then(data => {
        setAppointments([...appointments, data]);
        setNewAppointment({});
      });
  };

  const handleDeleteAppointment = id => {
    fetch(`https://localhost:7189/api/appointment/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedAppointments = appointments.filter(a => a.id !== id);
        setAppointments(updatedAppointments);
      });
  };

  return (
    <div>
      <h1>Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tutor</th>
            <th>Student</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.tutorId}</td>
              <td>{appointment.studentId}</td>
              <td>{appointment.startTime}</td>
              <td>{appointment.endTime}</td>
              <td>
                <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Create Appointment</h2>
      <form>
        <label>
          Tutor ID:
          <input type="number" name="tutorId" value={newAppointment.tutorId} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Student Name:
          <input type="text" name="studentName" value={newAppointment.studentName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="date" value={newAppointment.date} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Duration:
          <input type="number" name="duration" value={newAppointment.duration} onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={handleCreateAppointment}>Create</button>
      </form>
    </div>
  );
}

export default Appointments;
