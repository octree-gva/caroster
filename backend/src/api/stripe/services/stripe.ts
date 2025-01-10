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

    const moduleProduct = {
      name: "caroster-plus",
      notificationType: "EnabledCarosterPlus" as const,
    };

    const event = await strapi.db.query("api::event.event").findOne({
      where: { uuid: eventUuid },
      populate: ["creator"],
    });
    if (!event) {
      strapi.log.error(
        `Can't retrieve event with UUID ${eventUuid}. Webhook ID: ${stripeEvent.id}`
      );
      return;
    }

    try {
      const enabledModules = event.enabled_modules
        ? [...event.enabled_modules, moduleProduct.name]
        : [moduleProduct.name];
      await strapi.db.query("api::event.event").update({
        where: { uuid: eventUuid },
        data: { enabled_modules: enabledModules, unpaid: false },
      });
      strapi.log.info(
        `Module '${moduleProduct.name}' enabled for event ${eventUuid}`
      );

      if (event.creator)
        strapi.entityService.create("api::notification.notification", {
          data: {
            type: event.unpaid // unpaid before event update
              ? "EventCreated"
              : moduleProduct.notificationType,
            event,
            user: event.creator,
          },
        });
    } catch (error) {
      strapi.log.error(
        `Can't enable module ${moduleProduct.name} for event ${eventUuid}: ${error}`
      );
    }
  },
});
