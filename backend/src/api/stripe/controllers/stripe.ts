import Stripe from "stripe";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;

let stripe: Stripe;

if (STRIPE_SECRET) stripe = new Stripe(STRIPE_SECRET);

export default {
  handleWebhook: async (ctx) => {
    if (!stripe) {
      strapi.log.warn(
        "Stripe is not enabled for this instance. Please provide STRIPE_SECRET_KEY variable to enable it."
      );
      return;
    }

    try {
      const payload = ctx.request.body[Symbol.for("unparsedBody")];
      const sig = ctx.request.headers["stripe-signature"];
      const stripeEvent = stripe.webhooks.constructEvent(
        payload,
        sig,
        ENDPOINT_SECRET
      );
      if (stripeEvent.type === "checkout.session.completed") {
        strapi.service("api::stripe.stripe").enableModule(stripeEvent);
      } else
        strapi.log.warn(
          `[Stripe] Received webhook of type ${stripeEvent.type} (ignored)`
        );
      ctx.body = "ok";
    } catch (err) {
      strapi.log.error(`Webhook ${err}`);
      ctx.status = 400;
      ctx.body = err;
    }
  },
};
