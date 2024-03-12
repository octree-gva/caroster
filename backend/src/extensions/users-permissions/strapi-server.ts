import sendConfirmationEmail from "./services/sendConfirmationEmail";

export default (plugin) => {
  const userServices = plugin.services.user;
  plugin.services.user = (params) => {
    const services = userServices(params);
    return {
      ...services,
      sendConfirmationEmail,
    };
  };
  return plugin;
};
