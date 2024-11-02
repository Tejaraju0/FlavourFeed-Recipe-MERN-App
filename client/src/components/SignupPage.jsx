import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('https://flavourfeed-backend.onrender.com/api/signup', {
        username,
        email,
        password
      });
      
      setUsername('');
      setEmail('');
      setPassword('');
  
      setSuccessMessages([response.data.message]);
      setErrorMessages([]);
    } catch (error) {
      setSuccessMessages([]);
      const errorData = error.response.data;
      if (errorData.errors) {
        setErrorMessages(errorData.errors);
      } else {
        setErrorMessages(['An unexpected error occurred. Please try again.']);
      }
    }    
  };

  return (
    <div>
      <h1 className="text-underline" style={{ textAlign: 'center', paddingBottom: '10px' }}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label" style={{ fontSize: '18px' }}>Username:</label>
          <input type="text" className="form-control" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ fontSize: '18px' }}>Email address:</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ fontSize: '18px' }}>Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {errorMessages.length > 0 && (
          <div className="alert alert-danger" role="alert" style={{ fontSize: '13px', padding: '8px' }}>
            {errorMessages.map((message, index) => (
              <p key={index} style={{ color: 'red', margin: '0' }}>{message}</p>
            ))}
          </div>
        )}
        {successMessages.length > 0 && (
          <div className="alert alert-success" role="alert" style={{ fontSize: '14px', padding: '8px' }}>
            {successMessages.map((message, index) => (
              <p key={index} style={{ color: 'green', margin: '0' }}>{message}</p>
            ))}
          </div>
        )}
        <button type="submit" className="login-btn btn btn-default w-100 rounded-20 text-decoration-none fs-4">Sign Up</button>
      </form>
      <p className="mt-2 fs-5" style={{ fontSize: '16px' }}>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
}

export default SignupPage;
