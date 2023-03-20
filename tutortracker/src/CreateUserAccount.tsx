import React, { useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

function CreateUserAccount() {
  const [newUser, setNewUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Call the API to create the user account
    fetch("https://localhost:7189/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create user account");
        }
        return response.json();
      })
      .then((data) => {
        // Successfully created user account
        // You can navigate to another page or show a success message
        console.log("User account created:", data);
      })
      .catch((error) => {
        // Handle error when creating user account
        console.error("Error creating user account:", error);
      });

    // Reset the form
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
    });
  };

  return (
    <div>
      <h1>Create User Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateUserAccount;
