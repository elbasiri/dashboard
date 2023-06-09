import React, { useState, useEffect } from 'react';
import axios from 'axios';
import App from './App';
import './components/dashboardAdmin/css/loginStyle.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: email,
        password: password
      });

      // Handle the response, e.g., store the token in local storage
      localStorage.setItem('token', response.data.token);
      console.log('Login successful');
      return true; // Return true for successful login
    } catch (error) {
     setError('Email or Password Incorrect');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const isLogged = await login(email, password);
      if (isLogged) {
        setIsLoggedIn(true);
      } else {
        console.error('Login failed');
        // Handle the error, e.g., display an error message
      }
    } catch (error) {

      setError('Email or Password Incorrect');
    }
  };

  const handleLogout = () => {
    // Perform any necessary logout actions, e.g., clear local storage, reset state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    // Display the dashboard for authenticated users
    return (
      <div>
        <App />
        <button className='btn btn-light' style={
          {
               position: "absolute",
               right: "25px",
               top: "25px",
          }
        } onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // Display the register and login forms
  return (
     <div className="login-container">
     <h1>Login</h1>
     <form onSubmit={handleLogin}>
       <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
       <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
       <p className='text-danger'>{error}</p>
       <button className="submit-button" type="submit">Login</button>
     </form>
   </div>
  );
};

export default Auth;
