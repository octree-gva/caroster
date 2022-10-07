const registerExtension = ({ nexus, strapi }) => ({
  types: [
    nexus.extendInputType({
      type: "UsersPermissionsRegisterInput",
      definition(t) {
        t.string("firstName");
        t.string("lastName");
        t.string("lang");
        t.boolean("newsletterConsent");
      },
    }),
  ],
});

export default [registerExtension];
