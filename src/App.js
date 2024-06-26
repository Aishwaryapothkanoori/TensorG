import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDisplay from './components/FeedbackDisplay';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (profile) => {
    setUser(profile);
  };
  return (
    <div className="App">
    {user ? (
      <>
        <div>Welcome, {user.name}</div>
        <FeedbackForm user={user} />
        <FeedbackDisplay />
      </>
    ) : (
      <Login onLogin={handleLogin} />
    )}
  </div>   
  );
}

export default App;
