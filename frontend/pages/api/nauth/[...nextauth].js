import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const {STRAPI_URL = 'http://localhost:1337'} = process.env;

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'magic-link',
      credentials: {
        token: {label: 'Token', type: 'password'},
      },
      async authorize(credentials) {
        console.log({credentials});
        const response = await fetch(`${STRAPI_URL}/api/auth/magic-link`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            token: credentials.token,
          }),
        });
        const data = await response.json();
        if (!data?.jwt) return null;
        else {
          const {user, jwt} = data;
          return {...user, jwt};
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async params => {
      const {token, user, account} = params;

      // Google Auth
      if (account?.provider === 'google') {
        const response = await fetch(
          `${STRAPI_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const data = await response.json();

        if (data.error) {
          console.error(
            `Error from Strapi on authentication with Google: `,
            data.error
          );
          throw new Error(data.error?.message || data.error);
        }

        token.id = data.user.id;
        token.jwt = data.jwt;
        token.email = data.user.email;
        token.username = data.user.name;
        token.lang = data.user.lang?.toLowerCase();
        token.provider = account.provider;
      }

      // Strapi Auth
      else if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.email = user.email;
        token.username = user.firstname;
        token.lang = user.lang?.toLowerCase();
        token.provider = account.provider;
      }

      return token;
    },
    session: async params => {
      const {session, token} = params;
      if (session) {
        try {
          const response = await fetch(`${STRAPI_URL}/api/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.jwt}`,
            },
          });
          const profile = await response.json();
          session.profile = profile;
        } catch (error) {
          console.error(error);
        }

        session.token = token;
        session.user.name = token.username;
        session.user.lang = token.lang;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
});

export default async function handler(...params) {
  await authHandler(...params);
}
