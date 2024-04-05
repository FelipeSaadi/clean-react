import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http'
import { EmailInUseError } from '@/domain/errors'
import { type AccountModel } from '@/domain/models'
import { type AddAccount, type AddAccountParms } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParms, AccountModel>
  ) {}

  async add (params: AddAccountParms): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: return { accessToken: '' }
    }
  }
}