module.exports = ({env}) => ({
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: env('SENDGRID_DEFAULT_FROM', 'sysadmin@octree.ch'),
      defaultReplyTo: env('SENDGRID_DEFAULT_REPLYTO', 'sysadmin@octree.ch'),
    },
  },
});
