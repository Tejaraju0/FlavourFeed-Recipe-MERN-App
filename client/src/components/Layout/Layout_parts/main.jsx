import React from 'react';
import "../../../Files/css/styles.css"

function Main({ children }) {
  return (
    <div className="container-xxl px-md-5 bg-white">
      <main>
        {children}
      </main>
    </div>
  );
}

export default Main;

