import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');

  // Retrieve user data from session storage and parse it as JSON
  const initialUserData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
  const [user, setUser] = useState(initialUserData);

  useEffect(() => {
    console.log('User logged in status:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Set user data received from the login response
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('user', JSON.stringify(userData));
  };
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuth, AuthProvider };
