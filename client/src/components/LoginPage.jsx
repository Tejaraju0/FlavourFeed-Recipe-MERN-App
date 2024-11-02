import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Layout/authContext';

function LoginPage() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://flavourfeed-backend.onrender.com/api/login', {
        email,
        password
      });
      
      setEmail('');
      setPassword('');

      if (response.status === 200) {
        const userData = response.data.user;
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      } else {
        setErrorMessages('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error.response.data.message);
      setErrorMessages(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-underline" style={{ textAlign: 'center', paddingBottom: '10px' }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label" style={{ fontSize: '20px', paddingTop: '5%' }}>Email address:</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label" style={{ fontSize: '20px' }}>Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {errorMessages && (
          <div className="alert alert-danger" role="alert">
            <p style={{ color: 'red' }}>
              <i className="fa fa-times-circle" style={{ marginRight: '5px' }}></i>{errorMessages}
            </p>
          </div>
        )}
        <button type="submit" className="login-btn btn btn-default w-100 rounded-20 text-decoration-none fs-4">Login</button>
      </form>
      <p className="mt-3 fs-5" style={{ fontSize: '20px' }}>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default LoginPage;
