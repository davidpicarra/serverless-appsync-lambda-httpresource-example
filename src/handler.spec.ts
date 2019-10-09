import { graphqlHandler } from './handler'
import fetch from 'node-fetch'
import { APIGatewayEvent } from 'aws-lambda'

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch')
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('handler', () => {
  it('should request to https://wttr.in', async () => {
    const expectedResponse = '👍'
    mockedFetch.mockResolvedValue(new Response(expectedResponse))
    const result = await graphqlHandler({})
    expect(fetch).toHaveBeenCalledWith('https://wttr.in/?format=1', {
      timeout: 2000
    })
    expect(result).toBe('👍')
  })

  it('should use event.format', async () => {
    const expectedResponse = '👍'
    mockedFetch.mockResolvedValue(new Response(expectedResponse))
    const result = await graphqlHandler({ format: 'foo' })
    expect(fetch).toHaveBeenCalledWith('https://wttr.in/?format=foo', {
      timeout: 2000
    })
    expect(result).toBe('👍')
  })

  it('should return error if request failed', async () => {
    mockedFetch.mockRejectedValue(new Error('foobar'))
    const result = await graphqlHandler({})
    expect(result.message).toBe('foobar')
    expect(fetch).toHaveBeenCalledWith('https://wttr.in/?format=foo', {
      timeout: 2000
    })
  })
})
