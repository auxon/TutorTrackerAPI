import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Availability } from './Availability';
import CreateSlotForm from './CreateSlotForm';

interface CalendarComponentProps {
  availability: Availability[];
  onSlotSelected: (selectedSlot: Availability) => void;
  onSlotCreated: (newSlot: Availability) => void;
}

function CalendarComponent({ availability, onSlotSelected, onSlotCreated }: CalendarComponentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | Date[]) => {
    setSelectedDate(date as Date);
  };

  const handleSlotSelection = (slot: Availability) => {
    onSlotSelected(slot);
  };

  const handleSlotCreation = (newSlot: Availability) => {
    onSlotCreated(newSlot);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date }) => {
          const availableSlots = availability.filter((slot) => new Date(slot.startTime).toDateString() === date.toDateString());
          return (
            <div>
              {availableSlots.map((slot) => (
                <button key={slot.startTime} onClick={() => handleSlotSelection(slot)}>
                  {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}
                </button>
              ))}
            </div>
          );
        }}
      />
      {/* Add a form for tutors to create available time slots */}
      <h2>Create Available Time Slot</h2>
      <form>
        <CreateSlotForm tutorId={tutor.Id} onCreateSlot={handleSlotCreation} />
      </form>
    </div>
  );
}

export default CalendarComponent;
