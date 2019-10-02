# serverless-appsync-lambda-httpresource-example [![CircleCI](https://circleci.com/gh/davidpicarra/serverless-appsync-lambda-httpresource-example.svg?style=svg)](https://circleci.com/gh/davidpicarra/serverless-appsync-lambda-httpresource-example)

This sample repository shows how to setup AWS AppSync that exposes two GraphQL queries:
- getWeatherWithHTTPResource which gets weather information from https://wttr.in using a HTTP Resource
- getWeatherWithLambda which gets weather information from https://wtter.in using a Lambda which then executes the request

This repository also shows different ways of testing a AWS AppSync:
- At unit level for the lambda handler defined
- At the mapping template level, by testing directly the VTL defined maps with `@conduitvc/appsync-emulator-serverless/vtl`
- At AppSync level using the helper `createAppSync` available in `@conduitvc/appsync-emulator-serverless/jest`

Notes:
- Created `dynamodb-local.js` to start DynamoDB locally before we run the tests so the tests don't timeout since DynamoDB takes a while to start for the first time
- Created `jest-utils` to provide utils for testing the VTL files, `loadVTL` which will load the VTL file and `renderVTL` which will try to render the VTL provided with the function `vtl` available ij `@conduitvc/appsync-emulator-serverless/vtl`

# Tech stack

## Serverless

> https://serverless.com/

The Serverless Framework is an open-source CLI for building and deploying serverless applications. With over 6 million deployments handled, the Serverless Framework is the tool developers trust to build cloud applications.

# Build Setup

## Using Docker

```bash
# Build Dockerfile
$ yarn docker:build

# graphql will run on http://localhost:62222/graphql
$ yarn docker:dev

# Running tests
$ yarn docker:test

# Running tests with watch
$ yarn docker:test:dev
```

## Running locally

``` bash
# install dependencies
$ yarn

# graphql will run on http://localhost:62222/graphql
$ yarn run dev
```

# Testing

```bash
curl 'http://localhost:62222/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3001' -H 'x-api-key: ABC123' --data-binary '{"query":"{ getWeatherWithHTTPResource }"}' --compressed
```


```bash
curl 'http://localhost:62222/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3001' -H 'x-api-key: ABC123' --data-binary '{"query":"{ getWeatherWithLambda }"}' --compressed
```
