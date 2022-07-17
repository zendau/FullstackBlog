import { createContext, useContext } from 'react'

export type AuthContextType = {
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}


export const AuthContext = createContext<AuthContextType>({
  authStatus: false,
  setAuthStatus: status => console.warn('no status provider')
})

export const useAuthContext = () => useContext(AuthContext)