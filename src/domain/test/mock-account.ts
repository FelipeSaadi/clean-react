import { type AuthenticationParms } from '@/domain/usecases/authentication'
import faker from 'faker'
import { type AccountModel } from '../models/account-model'

export const mockAuthentication = (): AuthenticationParms => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
