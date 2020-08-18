import gql from 'graphql-tag'
import { appsyncClient, loadVTL, renderVTL } from '../jest-utils'
const getWeatherWithHTTPResourceRequest = loadVTL('~/getWeatherWithHTTPResource-request-mapping-template.vtl')
const getWeatherWithHTTPResourceResponse = loadVTL('~/getWeatherWithHTTPResource-response-mapping-template.vtl')

describe('getWeatherWithHTTPResource', () => {
  beforeEach(() => {
    console.log = jest.fn()
    console.warn = jest.fn()
  })

  describe('query with appsyncClient', () => {
    it('should return successfully without arguments', async () => {
      await appsyncClient.client.query({
        query: gql`
          {
            getWeatherWithHTTPResource
          }
        `,
      })
    })
    it('should return successfully with arguments', async () => {
      await appsyncClient.client.query({
        query: gql`
          {
            getWeatherWithHTTPResource(format: "2")
          }
        `,
      })
    })
  })

  describe('mapping template', () => {
    describe('request', () => {
      it('should build query with default parameters', () => {
        // Act.
        const response = renderVTL(getWeatherWithHTTPResourceRequest)
        // Assert.
        expect(response.data).toEqual({
          version: '2018-05-29',
          method: 'GET',
          resourcePath: '/',
          params: {
            query: {
              format: '1',
            },
            headers: { 'Content-Type': 'application/json' },
          },
        })
      })
    })

    describe('response', () => {
      it('should return error if statusCode is not 200', () => {
        // Arrange.
        const context = {
          context: {
            result: {
              statusCode: 400,
              body: 'foo',
            },
          },
        }
        // Act.
        const response = renderVTL(getWeatherWithHTTPResourceResponse, context)
        // Assert.
        expect(response.errors[0].message).toBe('foo')
      })
      it('should parse entries', () => {
        // Arrange.
        const context = {
          context: {
            result: {
              statusCode: 200,
              body: 'foo\n',
            },
          },
        }
        // Act.
        const response = renderVTL(getWeatherWithHTTPResourceResponse, context)
        // Assert.
        expect(response.errors).toHaveLength(0)
        expect(response.data).toEqual("$context.result.body.replaceAll('\n','')")
      })
    })
  })
})
