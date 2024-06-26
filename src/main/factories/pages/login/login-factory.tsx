import React from 'react'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { Login } from '@/presentation/pages'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/local-save-access-token/local-save-access-token-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={ makeRemoteAuthentication() }
      validation={ makeLoginValidation() }
      saveAccessToken={ makeLocalSaveAccessToken() }
    />
  )
}
