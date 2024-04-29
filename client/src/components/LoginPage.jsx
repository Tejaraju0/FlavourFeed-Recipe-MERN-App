import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { AuthContext } from './Layout/authContext'; // Import the authentication context

function LoginPage() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext); // Access authentication context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Corrected useNavigate initialization

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
  
      console.log('Login Response:', response); // Log the entire response object
  
      setEmail('');
      setPassword('');
  
      // Check if user data exists in the response
      if (response.data.user) {
        console.log('User Data:', response.data.user); // Log the user data received from the response
  
        // Update authentication context upon successful login
        setIsLoggedIn(true);
        setUser(response.data.user);
        
        // Store login state in session storage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Verify if user data is stored correctly in session storage
        console.log('Stored User Data:', sessionStorage.getItem('user'));
        
        // Redirect to '/' route after successful login
        navigate('/');
      } else {
        console.error('User data not found in response:', response.data);
      }
    } catch (error) {
      console.error('Login Error:', error); // Log any errors that occur during login
      setSuccessMessage('');
      const errorMessage = error.response.data.message;
      if (errorMessage) {
        setErrorMessages([errorMessage]);
      } else {
        setErrorMessages(['An unexpected error occurred. Please try again.']);
      }
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
        {errorMessages.length > 0 && (
          <div className="alert alert-danger" role="alert">
            {errorMessages.map((message, index) => (
              <p key={index} style={{ color: 'red' }}>
                <i className="fa fa-times-circle" style={{ marginRight: '5px' }}></i>{message}
              </p>
            ))}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            <i className="fa fa-check-circle" style={{ marginRight: '5px' }}></i>{successMessage}
          </div>
        )}
        <button type="submit" className="login-btn btn btn-default w-100 rounded-20 text-decoration-none fs-4">Login</button>
      </form>
      <p className="mt-3 fs-5" style={{ fontSize: '20px' }}>Don't have an account? <Link to="/signup">Sign up</Link></p> {/* Use Link component for navigation */}
    </div>
  );
}

export default LoginPage;