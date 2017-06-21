// @flow

import { Client } from 'dgraphql'

import schema from './schema.graphql'

import { getResponder } from './responder'

import type {
  LambdaAPIGatewayProxyEvent,
  LambdaContext,
  LambdaAPIGatewayCallback
} from './lambda'

const DGRAPH = String(process.env.DGRAPH)

const client = new Client({
  server: `http://${DGRAPH}:8080/query`,
  schema: schema,
  relay: false,
  debug: true
})

const responder = getResponder((event, context) => {
  return {
    schema: client.schema,
    context: client.getContext('en'), // TODO: accepts language header
    graphiql: true
  }
})

module.exports.graphql = (
  event: LambdaAPIGatewayProxyEvent,
  context: LambdaContext,
  callback: LambdaAPIGatewayCallback
) => {
  return responder(event, context)
    .then(response => {
      console.log('response', response)
      callback(null, response)
    })
    .catch(error => {
      console.log('error', error)
      callback(error)
    })
}
