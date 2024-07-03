# Reactive Variables

[Docs on Apollo's reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/)

Reactive variables are a useful mechanism for representing local state outside of the Apollo Client cache.

## Introduction

Reactive variables are very simple. They are variables that can be used and set just about anywhere in your application, even outside components.

### Reactive Vars in DirectHub

Currently, we utilize reactive vars in DirectHub for several data pieces. Unfortunately, this is just _another_ way to access "global" data, though they are quite elegant, and useful. Mainly, _most_ of the data stored in reactive vars can also be accessed via a route's data loader, or re-fetched from backend or apollo cache.

### Example

```javascript
// create a variable to use, can do this anywhere
export const currentUserVar = makeVar({});

// some file where we fetch _and_ SET the current user
const user = await fetchUser()
currentUserVar(user)

// some while where we need the reactive var value
const currentUser = currentUserVar()

// some COMPONENT where we need the reactive var to update re-renders
const currentUser = useReactiveVar(currentUserVar)

// before a storybook test render?!
// can be outside/top level of story, or decorator.
const mockUser = createMockUser()
currentUserVar(mockUser)

export const Default: Story = {
  play: () => {
    // test that needs some current user data, its there!
    // if the component is getting current user data from reactive var
  }
}
```

### Usage

Currently, we use reactive vars for `currentUser`, `business profile`, and `stripe`'s browser API instance. The more the merrier.
