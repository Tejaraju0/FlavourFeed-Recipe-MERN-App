// LoginLayout.jsx
import React from 'react';

function LoginLayout({ children }) {
  return (
    <div className="landing-page">
      <img src="/img/FlavourFeed.png" alt="FlavourFeed Icon" className="landing-photo" />
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '40px' }}>
        <div className="bg-white p-5" style={{ width: '500px', height: '580px', borderRadius: '5%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginLeft: '200px' }}>
          {/* Render the content from the route handler */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
