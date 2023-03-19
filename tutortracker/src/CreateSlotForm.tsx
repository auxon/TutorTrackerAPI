import React, { useState } from 'react';
import { Availability } from './Availability';

interface CreateSlotFormProps {
  tutorId: number;
  onCreateSlot: (newSlot: Availability) => void;
}

function CreateSlotForm({ tutorId, onCreateSlot }: CreateSlotFormProps) {
  const [newSlot, setNewSlot] = useState<Omit<Availability, 'tutorId'>>({
    startTime: '',
    endTime: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCreateSlot({ ...newSlot, tutorId });
    setNewSlot({ startTime: '', endTime: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start time:
        <input
          type="datetime-local"
          name="startTime"
          value={newSlot.startTime}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        End time:
        <input
          type="datetime-local"
          name="endTime"
          value={newSlot.endTime}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <button type="submit">Create Time Slot</button>
    </form>
  );
}

export default CreateSlotForm;
