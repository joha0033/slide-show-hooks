# Stripe

Stripe is an integral part of DirectHub's functionality. In order to utilize Stripe in the application we use [Stripe.js](https://docs.stripe.com/js)

## Introduction

Stripe's browser javascript library allows us to accept payments within the application without saving or managing a user's sensitive data.

### Usage

We currently utilize our Stripe.js's `redirectToCheckout` and provide a session id via directhub-service.

```javascript
await stripe.redirectToCheckout({
  sessionId: data?.createCheckoutSessionId,
});
```

### Note

1. Stripe handles currency in a _non-decimal_ form.
   - number/math: 12345 needs to be converted to 123.45
   - string/display: 12345 needs to be converted to "$123.45"
