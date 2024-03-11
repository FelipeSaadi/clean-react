import { createContext } from 'react'

export type StateProps = {
  isLoading: boolean
}

export type ErrorStateProps = {
  email: string
  password: string
  message: string
}

type ContextProps = {
  state: StateProps
  errorState: ErrorStateProps
}

export default createContext<ContextProps>({
  state: {
    isLoading: false
  },
  errorState: {
    email: '',
    password: '',
    message: ''
  }
})
