const sendgrid = require('../../../lib/sendgrid');

module.exports = {
  lifecycles: {
    async afterCreate(user) {
      if (user.email) sendgrid.subscribe(user.email);
    },
  },
};
