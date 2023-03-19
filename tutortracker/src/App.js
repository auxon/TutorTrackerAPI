import React, { useState } from 'react';
import './App.css';
import Appointments from './Appointments';
import CalendarComponent from './CalendarComponent';
import CreateUserAccount from './CreateUserAccount';
import LoginComponent from './LoginComponent';
import ProfileComponent from './ProfileComponent';

function App() {
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleCreateAccount = () => {
    setShowCreateAccountModal(true);
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    setShowProfilePage(true);
    setShowLoginModal(false);
  };

  const handleRegisterAsTutor = () => {
    // TODO: Register the logged-in user as a tutor
  };

  return (
    <div className="App">
      <header>
        <h1>Tutor Tracker</h1>
        {!loggedInUser && (
          <>
            <label className="create-account-link" onClick={handleCreateAccount}>
              Create Account
            </label>
            <label className="login-link" onClick={handleLogin}>
              Login
            </label>
          </>
        )}
        {loggedInUser && (
          <>
            <label className="logout-link" onClick={handleLogout}>
              Logout
            </label>
            <label className="profile-link" onClick={() => setShowProfilePage(true)}>
              Profile
            </label>
          </>
        )}
      </header>
      {showCreateAccountModal && <CreateUserAccount onClose={() => setShowCreateAccountModal(false)} />}
      {showLoginModal && <LoginComponent onLoginSuccess={handleLoginSuccess} onClose={() => setShowLoginModal(false)} />}
      {showProfilePage && (
        <ProfileComponent user={loggedInUser} onRegisterAsTutor={handleRegisterAsTutor} onClose={() => setShowProfilePage(false)} />
      )}
      {!showProfilePage && (
        <>
          <Appointments />
          <CalendarComponent />
        </>
      )}
    </div>
  );
}

export default App;
