module.exports = {
  definition: `
    extend type UsersPermissionsMe {
      profile: UsersPermissionsUser
    }

    extend input editUserInput {
      old_password: String
    }

    extend input UsersPermissionsRegisterInput {
      firstName: String
      lastName: String
      lang: String
    }
  `,
  mutation: `
    updateMe(input: editUserInput): updateUserPayload!
  `,
  type: {},
  resolver: {
    Mutation: {
      updateMe: {
        resolver: 'plugins::users-permissions.user.updateMe',
      },
    },
  },
};
