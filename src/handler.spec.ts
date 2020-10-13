import { graphqlHandler } from './handler'
import fetch from 'node-fetch'

const { Response } = jest.requireActual('node-fetch')

jest.mock('node-fetch')
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('handler', () => {
  beforeEach(() => {
    console.log = jest.fn()
    console.warn = jest.fn()
  })

  it('should request to https://wttr.in', async () => {
    // Arrange.
    const expectedResponse = '👍'
    mockedFetch.mockResolvedValue(new Response(expectedResponse))

    // Act.
    const result = await graphqlHandler({})

    // Assert.
    expect(fetch).toHaveBeenCalledWith('https://wttr.in/?format=1', {
      timeout: 2000,
    })
    expect(result).toBe('👍')
  })

  it('should use event.format', async () => {
    // Arrange.
    const expectedResponse = '👍'
    mockedFetch.mockResolvedValue(new Response(expectedResponse))

    // Act.
    const result = await graphqlHandler({ format: 'foo' })

    // Assert.
    expect(fetch).toHaveBeenCalledWith('https://wttr.in/?format=foo', {
      timeout: 2000,
    })
    expect(result).toBe('👍')
  })

  it('should return error if request failed', async () => {
    // Arrange.
    mockedFetch.mockRejectedValue(new Error('foobar'))

    // Act.
    const promise = graphqlHandler({})

    // Assert.
    expect(promise).rejects.toThrow('foobar')
    expect(fetch).toHaveBeenCalledWith('https://wttr.in/?format=foo', {
      timeout: 2000,
    })
  })
})
