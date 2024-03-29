import { type AccountModel } from '@/domain/models/account-model'

export type AuthenticationParms = {
  email: string
  password: string
}

export interface Authentication {
  auth: (AuthenticationParms) => Promise<AccountModel>
}
