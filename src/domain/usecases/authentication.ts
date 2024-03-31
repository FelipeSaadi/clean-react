import { type AccountModel } from '@/domain/models'

export type AuthenticationParms = {
  email: string
  password: string
}

export interface Authentication {
  auth: (AuthenticationParms) => Promise<AccountModel>
}
