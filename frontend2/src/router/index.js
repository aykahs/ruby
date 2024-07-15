import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard/'
import Routeprivate from './Routeprivate';
import Routepublic from './Routepublic';

function Router() {

  const getLayoutComponent = (path) => {
    return isAuthenticated ? Backend : AuthLayout;
  };
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <Routepublic>
            <Home />
          </Routepublic>
        }
      />
      <Route
        path={'/login'}
        element={
          <Routepublic>
            <Login />
          </Routepublic>
        }
      />
      <Route path={'/register'}
        element={
          <Routepublic>
            <Register />
          </Routepublic>
        } />
      <Route path={'/dashboard'} element={
        <Routeprivate>
          <Dashboard />
        </Routeprivate>
        } />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default Router
