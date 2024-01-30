import type { Stripe } from "stripe";

export default () => ({
  async enableModule(stripeEvent: Stripe.CheckoutSessionCompletedEvent) {
    const eventUuid = stripeEvent.data.object.client_reference_id;
    if (!eventUuid) {
      strapi.log.error(
        `Can't retrieve event UUID in Stripe webhook. Webhook ID: ${stripeEvent.id}`
      );
      return;
    }

    if (stripeEvent.data.object.payment_status !== "paid") {
      strapi.log.error(
        `Can't enable module for event UUID ${eventUuid} as payment status is not 'paid'. Webhook ID: ${stripeEvent.id}`
      );
      return;
    }

    const paymentLink = stripeEvent.data.object.payment_link as string;
    const moduleProduct = await getModuleProduct(paymentLink);
    if (!moduleProduct) {
      strapi.log.error(
        `Can't retrieve product/module in Stripe webhook. Is module enabled ? Webhook ID: ${stripeEvent.id}`
      );
      return;
    }

    const event = await strapi.db.query("api::event.event").findOne({
      where: { uuid: eventUuid },
    });
    if (!event) {
      strapi.log.error(
        `Can't retrieve event with UUID ${eventUuid}. Webhook ID: ${stripeEvent.id}`
      );
      return;
    }

    try {
      const enabledModules = event.enabled_modules
        ? [...event.enabled_modules, moduleProduct]
        : [moduleProduct];
      await strapi.db.query("api::event.event").update({
        where: { uuid: eventUuid },
        data: { enabled_modules: enabledModules },
      });
      strapi.log.info(
        `Module '${moduleProduct}' enabled for event ${eventUuid}`
      );
    } catch (error) {
      strapi.log.error(
        `Can't enable module ${moduleProduct} for event ${eventUuid}: ${error}`
      );
    }
  },
});

const getModuleProduct = async (paymentLink: string) => {
  const modulesConfig = await strapi.entityService.findOne(
    "api::module.module",
    1
  );
  const modules = [];
  if (modulesConfig.caroster_plus_enabled) {
    modules.push([
      modulesConfig.caroster_plus_payment_link_id,
      "caroster-plus",
    ]);
  }
  return Object.fromEntries(modules)[paymentLink];
};
