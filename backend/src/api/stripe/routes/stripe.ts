export default {
  routes: [
    {
      method: "POST",
      path: "/webhooks",
      handler: "stripe.handleWebhook",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
