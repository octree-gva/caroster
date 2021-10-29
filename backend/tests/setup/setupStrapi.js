const {setupStrapi} = require('../helpers/strapi');
const getContext = require('../helpers/context');

jest.setTimeout(20000);

beforeAll(async () => {
  await setupStrapi();
  global.getContext = getContext;
});
