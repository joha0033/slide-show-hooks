# Client-side Codegen

DirectHub has two separate `gql` subdirectories

1. `server` - home to server-side codegen needs - Our API
1. `client` - home to client-side codegen needs - Local Resolvers

## Introduction

In order to utilize the `graphql-codegen` ways for local resolvers, ei. query and mutation hooks, generated fragments and docs, we use `src/gql/client/.graphql-codegen.yml`

### .graphql-codegen.yml

Strikingly similar to what we're used to seeing in a codegen file. There are some minor differences though.

1. schema is local (schema first). In order to generate queries and mutations we need to add them to our local `schema.gql`, conveniently located at `src/gql/client/schema.graphql`
1. In order to type our local resolvers, we lean on the `typescript-resolvers` plugin. We use this in our `client.ts`'s `resolvers` variable type.
