import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/local-save-access-token/local-save-access-token-factory'
import { makeSignupValidation } from './signup-validation-factory'
import { makerRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={ makerRemoteAddAccount() }
      validation={ makeSignupValidation() }
      saveAccessToken={ makeLocalSaveAccessToken() }
    />
  )
}
