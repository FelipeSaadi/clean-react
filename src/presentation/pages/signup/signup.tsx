import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { LoginHeader, Footer, Input, FormStatus, SubmitButton } from '@/presentation/components'
import { type Validation } from '@/presentation/protocols/validation'
import { type SaveAccessToken, type AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    errorMessage: ''
  })

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    void (async (): Promise<void> => {
      event.preventDefault()
      try {
        if (state.isLoading || state.isFormInvalid) {
          return
        }
        setState({ ...state, isLoading: true })
        const account = await addAccount.add({
          name: state.name,
          email: state.email,
          password: state.password,
          passwordConfirmation: state.passwordConfirmation
        })
        await saveAccessToken.save(account.accessToken)
        navigate('/', { replace: true })
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          errorMessage: error.message
        })
      }
    })()
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder='Digite seu nome' />
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <Input type="password" name="passwordConfirmation" placeholder='Repita sua senha' />
          <SubmitButton text='Cadastrar'/>
          <Link data-testid="login-link" to="/login" className={Styles.link}>Voltar para Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
