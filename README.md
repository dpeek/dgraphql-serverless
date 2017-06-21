This example uses the Serverless framework to deploy a Dgraph instance to EC2
and DgraphQL endpoint to Lambda and API Gateway.

First, [setup Serverless](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
with your AWS identity.

Next, update `provider.vpc.subnetIds` in `serverless.yaml` with the subnets you
want your Lambda and Dgraph instanc to run in. You can list the subnet IDs in
your account from the command line with the AWS CLI:

```shell
$ aws ec2 describe-subnets | grep SubnetId
```

You might also want to change the region the service will run in (it is set to
`eu-west-2` in `serverless.yaml`)

> Warning: I hit memory limits running Dgraph on the free-tier `t2.micro`
> instance, so it's currently configured to run on `t2.medium` which is not
> free. It will cost you about $1.20 a day so don't forget to run
> `yarn run remove` when you've finished experimenting

Finally, install the dependencies and deploy the service:

```
$ yarn install
$ yarn run deploy
```

You can then open the deployed endpoint in your browser to interact with the
service through GraphiQL.

Here's a mutation to get you started:

```
mutation {
  createPerson(input: {
    name: "John Lennon",
    friends: [
      { name: "Paul McCartney" },
      { name: "George Harrison" },
      { name: "Ringo Starr" }
    ]
  }) {
    person {
      id
      name
      friends {
        id
        name
      }
    }
  }
}
```

After changing `src/schema.graphql` run `yarn run deploy` again to update the
deployed schema.

For more on what you can do with the schema checkout the [Dgraphql documentation](http://dpeek.com/dgraphql/).

To remove the service run:

```
$ yarn run remove
```

> Serverless seems to have an intermittent issue cleaning up network interfaces.
> If the stack removal stalls you might have to remove the interface manually in
> the AWS EC2 dashboard and try removing again.

Happy hacking :)
