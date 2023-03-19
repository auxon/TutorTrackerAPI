import React, { useState, useEffect, ChangeEvent } from 'react';
import CalendarComponent from './CalendarComponent';
import { Availability } from './Availability';

interface Appointment {
  id: number;
  tutorId: number;
  studentId: number;
  startTime: string;
  endTime: string;
}

interface NewAppointment {
  tutorId?: number;
  studentId?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({});
  const [availability, setAvailability] = useState<Availability[]>([]);

  const handleSlotSelected = (selectedSlot: Availability) => {
    // Implement the logic for handling the selected time slot
  };

  const handleSlotCreated = (newSlot: Availability) => {
    // Implement the logic for handling new available time slot creation
  };

  useEffect(() => {
    fetch('https://localhost:7189/api/appointment')
      .then(response => response.json())
      .then(data => setAppointments(data));
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      .then((data: Appointment) => {
        setAppointments([...appointments, data]);
        setNewAppointment({});
      });
  };

  const handleDeleteAppointment = (id: number) => {
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
          Student ID:
          <input type="number" name="studentId" value={newAppointment.studentId} onChange={handleInputChange} />
        </label>
        <br />
        <label>
            Date and Time:
            <CalendarComponent 
              availability={availability}
              onSlotCreated={handleSlotCreated}
              onSlotSelected={handleSlotSelected}
              />
        </label>
        <br />
        <button type="button" onClick={handleCreateAppointment}>Create</button>
      </form>
    </div>
  );
}

export default Appointments;