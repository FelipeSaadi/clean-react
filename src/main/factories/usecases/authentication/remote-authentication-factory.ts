import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { type Authentication } from '@/domain/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
