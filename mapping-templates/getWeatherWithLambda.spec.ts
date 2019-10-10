import gql from 'graphql-tag'
import { appsyncClient, loadVTL, renderVTL } from '../jest-utils'

const getWeatherWithLambdaRequest = loadVTL(
  '~/getWeatherWithLambda-request-mapping-template.vtl'
)
const getWeatherWithLambdaResponse = loadVTL(
  '~/getWeatherWithLambda-response-mapping-template.vtl'
)

describe('getWeatherWithLambda', () => {
  describe('query with appsyncClient', () => {
    it('should return successfully without arguments', async () => {
      try {
        await appsyncClient.client.query({
          query: gql`
            {
              getWeatherWithLambda
            }
          `,
        })
      } catch (error) {
        console.log(error)
        console.log(error.message)
      }
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
        const response = renderVTL(getWeatherWithLambdaRequest)
        expect(response.data).toEqual({
          version: '2018-05-29',
          operation: 'Invoke',
          payload: {
            field: 'getWeatherWithLambda',
            arguments: '$utils.toJson($context.arguments)',
          },
        })
      })
    })

    describe('response', () => {
      it('should return json object', () => {
        const context = {
          result: {
            body: 'foo',
          },
        }
        const response = renderVTL(getWeatherWithLambdaResponse, {
          context,
        })
        expect(response.errors).toHaveLength(0)
        expect(response.data).toEqual(context.result)
      })
    })
  })
})
