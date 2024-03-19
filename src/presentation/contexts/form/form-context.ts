import { createContext } from 'react'

export type StateProps = {
  isLoading: boolean
  email: string
  password: string
  emailError: string
  passwordError: string
  errorMessage: string
}

type ContextProps = {
  state: StateProps
  setState: React.Dispatch<React.SetStateAction<StateProps>>
}

export default createContext<ContextProps>({
  state: {
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    errorMessage: ''
  },
  setState: () => null
})
