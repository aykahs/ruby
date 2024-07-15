/* eslint-disable */

import {  useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import  AuthContext  from '../Contexts/AuthContexts'
import  api  from '../Service/api'
import { setAuthorizationHeader } from '../Service/interceptors'
import Backend from '../component/Loyout/Backendlayout';
import Frontend from '../component/Loyout/Frontendlayout';
import { createSessionCookies, getToken, removeSessionCookies } from '../utils/tokenCookies'


function AuthProvider(props) {
  const { children } = props

  const [user, setUser] = useState()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const token = getToken()
  const isAuthenticated = Boolean(token)

  async function signIn(params) {
    const { email, password } = params
    try {
      const response = await api.post('/auth/login', { email, password })
      if(response.status == 200){
        const { token, refreshToken, user } = response.data

        createSessionCookies({ token, refreshToken })
        setUser(user)
        setAuthorizationHeader({ request: api.defaults, token })
      }
      return response;
    } catch (error) {
  
      throw error; 
    }
  }

  function signOut() {
    removeSessionCookies()
    setUser(undefined)
    setLoadingUserData(false)
    // navigate('/login')
  }
  const getLayoutComponent = () => {
    return isAuthenticated ? Backend : Frontend;
  };
  useEffect(() => {
    if (!token) {
      console.log('askh')
      removeSessionCookies()
      setUser(undefined)
      setLoadingUserData(false)
    }
  }, [navigate, pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData() {
      setLoadingUserData(true)

      try {
        const response = await api.get('/me')

        if (response?.data) {
          setUser(response.data.user)
        }
      } catch (error) {
        /**
         * an error handler can be added here
         */
      } finally {
        setLoadingUserData(false)
      }
    }

    if (token) {
      setAuthorizationHeader({ request: api.defaults, token })
      getUserData()
    }
  }, [])
  const LayoutComponent = getLayoutComponent();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        signIn,
        signOut
      }}
    >
      <LayoutComponent>
      {children}
      </LayoutComponent>
    </AuthContext.Provider>
  )
}

export default AuthProvider
