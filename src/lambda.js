export type LambdaAPIGatewayProxyEvent = {
  httpMethod: string,
  path: string,
  body: string,
  resource: string,
  queryStringParameters: { [string]: string },
  requestContext: {
    resourceId: string,
    apiId: string,
    resourcePath: string,
    httpMethod: string,
    requestId: string,
    accountId: string,
    identity: {
      apiKey: string,
      userArn: string,
      cognitoAuthenticationType: string,
      caller: string,
      userAgent: string,
      user: string,
      cognitoIdentityPoolId: string,
      cognitoIdentityId: string,
      cognitoAuthenticationProvider: string,
      sourceIp: string,
      accountId: string
    }
  },
  headers: { [string]: string },
  pathParameters: { [string]: string },
  stageVariables: { [string]: string }
}

export type LambdaContext = {
  getRemainingTimeInMillis: () => number,
  callbackWaitsForEmptyEventLoop: boolean,
  functionName: string,
  functionVersion: string,
  invokedFunctionArn: string,
  memoryLimitInMB: number,
  awsRequestId: string,
  logGroupName: string,
  logStreamName: string,
  clientContext: string,
  identity?: {
    cognitoIdentityId: string,
    cognitoIdentityPoolId: string
  },
  clientContext?: {
    client: {
      installation_id: string,
      app_title: string,
      app_version_name: string,
      app_version_code: string,
      app_package_name: string
    },
    env: {
      platform_version: string,
      platform: string,
      make: string,
      model: string,
      locale: string
    }
  }
}

export type LambdaAPIGatewayResult = {
  statusCode: number,
  headers: { [string]: string },
  body: string
}

export type LambdaAPIGatewayCallback = (
  error: Error,
  result: LambdaAPIGatewayResult
) => void

export type LambdaAPIGatewayProxyHandler = (
  event: LambdaAPIGatewayProxyEvent,
  context: LambdaContext,
  callback: LambdaCallback
) => void

export type LambdaAPIGatewayProxyResponder = (
  event: LambdaAPIGatewayProxyEvent,
  context: LambdaContext
) => Promise<LambdaAPIGatewayResult>
