import React, { useState, useEffect } from 'react';

interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  isTutor?: boolean;
}

interface NewTutor {
  hourlyRate?: number;
  subject?: string;
}

function ProfileComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [newTutor, setNewTutor] = useState<NewTutor>({});

  useEffect(() => {
    fetch('https://localhost:7189/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setUser(data));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewTutor({ ...newTutor, [name]: value });
  };

  const handleCreateTutor = () => {
    fetch('https://localhost:7189/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newTutor)
    })
      .then(response => response.json())
      .then(() => {
        setUser({ ...user, isTutor: true });
        setNewTutor({});
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      {!user.isTutor && (
        <div>
          <h2>Register as a Tutor</h2>
          <form>
            <label>
              Hourly rate:
              <input type="number" name="hourlyRate" value={newTutor.hourlyRate} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Subject:
              <input type="text" name="subject" value={newTutor.subject} onChange={handleInputChange} />
            </label>
            <br />
            <button type="button" onClick={handleCreateTutor}>Register</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProfileComponent;
