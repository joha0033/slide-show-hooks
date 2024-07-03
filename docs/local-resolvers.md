# DirectHub - Local Resolvers Documentation for Shopping Cart CRUD Operations

## Introduction

DirectHub employs local resolvers to manage shopping cart CRUD (Create, Read, Update, Delete) operations within the application. This document outlines the usage of local resolvers for handling shopping cart functionality in DirectHub.

## Shopping Cart CRUD Operations

The shopping cart functionality in DirectHub involves the following CRUD operations:

1. **Create**: Adding items to the shopping cart.
   - addToCart
2. **Read**: Retrieving the items currently in the shopping cart.
   - cartItems
   - cartItem
3. **Update**: Modifying the quantity of items in the shopping cart.
   - updateCartItem
4. **Delete**: Removing items from the shopping cart.
   - removeFromCart
   - clearCartItems

## Implementation Details

### Local Resolvers

DirectHub defines local resolvers to handle the shopping cart CRUD operations. These resolvers are implemented using Apollo Client's local state management capabilities and are responsible for:

- Reading the current state of the shopping cart.
- Adding items to the shopping cart.
- Modifying the quantity of items in the shopping cart.
- Removing items from the shopping cart.

### Schema First

DirectHub utilizes a GraphQL schema to define the structure of the shopping cart data and the input types required for CRUD operations.

### Mocking Local Resolvers

DirectHub's Storybook testing requires local resolvers to be available, and the ability to control mock data is essential. We have two ways to mock cache and local resolver data within Storybook.

1. parameters - mainly used to returning errors from local resolver hooks
1. decorators - primarily used to set apollo cache data

#### Parameters

Within `.storybook/preview`, the method `clientResolverDecorator` handles setting local resolver mocks by receiving desired updates per story's `parameter` key.

Updating queries add `parameter.mockClientQueries` to story
Updating mutations add `parameter.mockClientMutations` to story

The structure of this is essential and is as follows.

```javascript
// story file example

// can be done in any of storybook's parameters!
export const RemoveItemError: Story = {
  parameters: {
    mockClientMutations: {
      removeFromCart: mockRemoveFromCartMutation(() => {
        throw new GraphQLError("Failed to remove from cart");
      }),
    },
  },
  play: () => {
    // ... storybook tests - removeFromCart will throw an error
  }
}
```

There will be a helpful error in the browser when viewing a story if you happen to misspell a resolver. Lets say you added the following to a story.

```javascript
// ... story things
  parameters: {
    mockClientMutations: {
      deleteCartItem: mockRemoveFromCartMutation(() => {
        throw new GraphQLError("Failed to remove from cart");
      }),
    },
  },
```

You will get the following error in the rendered story.

```javascript
Error for mocked Mutation Resolver
Check the keys in mockClientMutations for your "Remove Item Error" story.

They should match the following: addToCart, clearCartItems, removeFromCart, updateCartItem
```

#### Decorators

Using decorators to set cache is pretty straight forward. Any story where you would like cache to be set before the rendering, primarily for queries, just use the `client` in a decorator.

```javascript
// story file example

export default {
  component: Cart,
  decorators: [withRouter],
  loaders: [
    () => {
      client.writeQuery({
        query: CartItemsDocument,
        data: {
          cartItems: [cartItem],
        },
      });
    },
  ],
} satisfies Meta<typeof Cart>;
```

### Error Handling - TODO

DirectHub **does not** implement error handling mechanisms within the local resolvers to manage potential errors that may occur during shopping cart operations.

In the `client.ts` file we enable the following methods for debugging issues with local state updates when the application is in a dev environment.

- `loadDevMessages` - The purpose is to provide developers with insight into the cache behavior of Apollo Client during development. It loads messages related to cache hits, and cache misses, helping debug.
- `loadErrorMessages` - The purpose is to assist in resolving errors encountered during development. It retrieves error messages related to GraphQL queries, mutations, aiding in debugging and troubleshooting their applications.

**These will be warnings in the browser's console, and will not appear in Apollo's query and mutation hooks!**

In order for a Local Resolver's hook response's `error` to be available, we will need to add a `throw` within the resolver's function.
