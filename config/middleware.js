module.exports = {
  load: {
    after: ["parser", "router", "reactapp"],
  },
  settings: {
    reactapp: {
      enabled: true,
    },
  },
};
