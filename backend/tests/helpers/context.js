const getContext = (context = {}) => ({
  state: {
    user: {
      id: 1,
    },
  },
  request: {},
  params: {},
  query: {},
  send: jest.fn(),
  badRequest: jest.fn(),

  ...context,

  setBody(body) {
    this.request.body = body;
  },
  setParams(params) {
    this.params = params;
  },
  setQuery(query) {
    this.query = query;
  },
  setUserId(userId) {
    this.state.user = {
      id: userId,
    };
  },
});

module.exports = getContext;
