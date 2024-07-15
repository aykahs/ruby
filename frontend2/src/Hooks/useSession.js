import { useContext } from 'react';
import  AuthContext  from '../Contexts/AuthContexts';

function useSession() {
  const authContext = useContext(AuthContext);
  return authContext;
}

export default useSession;
