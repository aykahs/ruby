import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loadingUserData: false,
  signIn: () => {},
  signOut: () => {}
});

export default AuthContext;
