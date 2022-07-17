import { createContext, useContext } from 'react'

export type ChangeUserDataContextType = {
  newEmail: string;
  setNewEmail: (email: string) => void;
  newPassword: string
  setNewPassword: (password: string) => void
}


export const ChangeUserDataContext = createContext<ChangeUserDataContextType>({
  newEmail: "",
  setNewEmail: email => console.warn('no newEmail provider'),
  newPassword: "",
  setNewPassword: password => console.warn("no newPassword provider")
})

export const useChangeUserDataContext = () => useContext(ChangeUserDataContext)