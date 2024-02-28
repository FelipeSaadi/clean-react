import { HttpPostClientSpy } from "../../test/mock-http-client";

class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
    ) {}

  async auth (): Promise<void> {
    await this.httpPostClient.post(this.url)
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const url = 'any_url'
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
});