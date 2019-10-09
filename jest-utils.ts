import createAppSync from '@conduitvc/appsync-emulator-serverless/jest'
import { vtl } from '@conduitvc/appsync-emulator-serverless/vtl'
import { create } from '@conduitvc/appsync-emulator-serverless/util'
import { readFileSync } from 'fs'
import { resolve } from 'path'
// global.fetch = require('node-fetch')

const appsyncCreated = createAppSync()

export const appsyncClient = appsyncCreated

export function loadVTL(filename: string): string {
  filename = filename.replace('~', 'mapping-templates/')
  const fullPath = resolve(__dirname, filename)
  return readFileSync(fullPath, 'utf8')
}

export interface GraphQLResponse {
  data: object | string
  errors: Array<GraphQLResponseError>
}

export interface GraphQLResponseError {
  message: string
}

export function renderVTL(
  vm: string,
  context: object = {},
  macros: object = {}
): GraphQLResponse {
  let errors = []
  let parsedVTL = vtl(vm, { ...context, util: create(errors) }, macros).trim()
  try {
    parsedVTL = JSON.parse(parsedVTL)
  } catch (e) {
    console.warn(e)
  }
  return { data: parsedVTL, errors }
}
