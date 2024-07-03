# DirectHub - Apollo Persisted Cache Documentation for Shopping Cart CRUD Operations

## Introduction

Apollo Persisted Cache 3 is a powerful caching solution for Apollo Client, designed to seamlessly store and retrieve GraphQL query results in various storage mediums, such as AsyncStorage, localStorage, or any custom storage engine.

DirectHub utilizes Apollo Persisted Cache to manage shopping cart operations through Apollo's local state management and resolvers. This document provides an overview of how Apollo Persisted Cache is utilized for handling CRUD operations related to the shopping cart functionality.

## Debounced Shopping Cart CRUD Operations

Our local storage should "react" accordingly, _but note_ that there is a 1 second delay/debounce on local storage updates. Speedy operations may not persist.

To react immediately, add `debounce: 0,` to `initCachePersistor`'s `new CachePersistor` options object.

## Implementation Details

### Apollo Persisted Cache Configuration

DirectHub sets up Apollo Persisted Cache to manage local state and resolvers for shopping cart operations. We filter out any non-`CartItem` data when updating the local storage cache data using the `persistenceMapper` key's value.

### Local Resolvers

DirectHub defines local resolvers within Apollo Persisted Cache to handle the CRUD operations for the shopping cart. These resolvers are responsible for reading and updating the shopping cart state stored in the cache.

### Queries and Mutations

DirectHub utilizes GraphQL queries and mutations to interact with the local shopping cart state managed by Apollo Persisted Cache. These GraphQL operations are executed through Apollo Client, enabling seamless integration with the application's front-end components.

### Error Handling

DirectHub implements error handling mechanisms to manage potential errors that may occur during shopping cart operations, ensuring a smooth user experience.

## Conclusion

By leveraging Apollo Persisted Cache for shopping cart CRUD operations, DirectHub provides users with a reliable and efficient shopping experience. The seamless integration of Apollo's local state management and resolvers enables smooth interactions with the shopping cart functionality, contributing to the overall usability and performance of the DirectHub application.
