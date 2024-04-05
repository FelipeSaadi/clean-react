import { type AccountModel } from '@/domain/models'

export type AddAccountParms = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AddAccount {
  add: (params: AddAccountParms) => Promise<AccountModel>
}
