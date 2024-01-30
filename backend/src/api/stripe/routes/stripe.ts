export default {
  routes: [
    {
      method: "POST",
      path: "/stripe",
      handler: "stripe.handleWebhook",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
