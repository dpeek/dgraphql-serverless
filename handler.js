import { graphql } from 'graphql'
import { Client } from 'dgraphql'

const schema = `
type Person {
  id: ID!
  name: String @index(type: "exact")
}
`

const DGRAPH = process.env.DGRAPH

const client = new Client({
  server: `http://${DGRAPH}:8080/query`,
  schema: schema,
  relay: false,
  debug: true
})

const handle = (source, variables) => {
  return graphql({
    schema: client.schema,
    source: source,
    contextValue: client.getContext(),
    variableValues: {}
  })
}

const createResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify(body)
})

module.exports.graphql = (event, context, callback) => {
  const body = JSON.parse(event.body)
  handle(body.query, body.variables)
    .then(response => callback(null, createResponse(200, response)))
    .catch(error =>
      callback(
        null,
        createResponse(error.responseStatusCode || 500, {
          message: error.message || 'Internal server error'
        })
      )
    )
}
