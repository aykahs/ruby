import { BrowserRouter } from 'react-router-dom';
import Router from './router'; // Ensure this points to your Router component correctly
import AuthProvider from './Providers/AuthProvider'; // Ensure this points to your AuthProvider correctly
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
