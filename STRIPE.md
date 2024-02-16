# Usage with Stripe

Caroster can be linked to Stripe in order to manage modules for an event.

> If your install your own instance of Caroster, you can ignore
> the configuration of Stripe. You will need to enable modules manually for
> each event (or add a lifecycle hook in Strapi).

## Configuration

Stripe link needs some configuration to declare in `backend/.env`:

- `STRIPE_SECRET_KEY`: Stripe API secret key to communicate with Stripe
- `STRIPE_ENDPOINT_SECRET`: Webhook secret to validate signatures

Then, we need to configure "Modules" in Strapi admin to provide more precise
configurations for Stripe.

## Process

1. User clicks on "Activate" button on frontend
2. User is redirected to Stripe Payment link page configured for the targeted module
3. User fills form and processes payment
4. Backend (Strapi) receives a webhook from Stripe on successfull payment
5. Backend enables module for the targeted event

## Development tool

To simulate webhook in a local dev environment, you can use [Strip CLI](https://stripe.com/docs/stripe-cli).

**Handle webhooks from your local env:**

```bash
stripe listen --forward-to localhost:1337/api/webhooks
```

**Simulate a payment for an event:**

```bash
# '7172ec65-5be1-4fcd-80cb-200914756d9a' is event's UUID
stripe trigger checkout.session.completed  --add checkout_session:client_reference_id=7172ec65-5be1-4fcd-80cb-200914756d9a
```
