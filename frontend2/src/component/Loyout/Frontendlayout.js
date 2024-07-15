import React from 'react';
const Frontendlayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <main>{children}</main>
    </div>
  );
};

export default Frontendlayout;
