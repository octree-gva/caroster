// Set authenticated user ID as queried ID
module.exports = async (ctx, next) => {
  ctx.params.id = ctx.state.user.id;
  console.log('USER ID', ctx.state.user.id);
  await next();
};
