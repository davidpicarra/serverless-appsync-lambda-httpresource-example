import gql from 'graphql-tag'
import { appsyncClient, loadVTL, renderVTL } from '../jest-utils'

const getWeatherWithLambdaRequest = loadVTL('~/getWeatherWithLambda-request-mapping-template.vtl')
const getWeatherWithLambdaResponse = loadVTL('~/getWeatherWithLambda-response-mapping-template.vtl')

describe('getWeatherWithLambda', () => {
  describe('query with appsyncClient', () => {
    it('should return successfully without arguments', async () => {
      await appsyncClient.client.query({
        query: gql`
          {
            getWeatherWithLambda
          }
        `,
      })
    })
    it('should return successfully with arguments', async () => {
      await appsyncClient.client.query({
        query: gql`
          {
            getWeatherWithLambda(format: "2")
          }
        `,
      })
    })
  })

  describe('mapping template', () => {
    describe('request', () => {
      it('should build query with default parameters', () => {
        // Act.
        const response = renderVTL(getWeatherWithLambdaRequest)
        // Assert.
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
        // Arrange.
        const context = {
          result: {
            body: 'foo',
          },
        }
        // Act.
        const response = renderVTL(getWeatherWithLambdaResponse, {
          context,
        })
        // Assert.
        expect(response.errors).toHaveLength(0)
        expect(response.data).toEqual(context.result)
      })
    })
  })
})
