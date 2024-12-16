import * as magicLink from "./services/magic-link";
import customRoutes from "./routes/user";

export default (plugin) => {
  const userServices = plugin.services.user;
  plugin.services.user = (params) => {
    const services = userServices(params);
    return {
      ...services,
      magicLink,
    };
  };
  plugin.routes["content-api"].routes.push(...customRoutes);
  return plugin;
};
