import React, { useState, ChangeEvent } from 'react';

interface LoginData {
  username: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
  const API_URL = 'https://localhost:7189/api'; // Replace with your API URL

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/account/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login (e.g., save token, redirect)
        console.log('Login successful:', data);
      } else {
        // Handle login errors (e.g., display error message)
        console.error('Login failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={loginData.username} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={loginData.password} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
