import { type Authentication, type AuthenticationParms } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParms
  callsCount = 0

  async auth (params: AuthenticationParms): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}
