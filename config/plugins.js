module.exports = ({env}) => ({
  email: {
    provider: 'sendgrid-template',
    providerOptions: {
      templateId: 'd-cbd6d791d40e4490ac373e1cf2c782f6',
    },
    settings: {
      defaultFrom: 'hello@caroster.io',
      defaultReplyTo: 'hello@caroster.io',
    },
  },
});
