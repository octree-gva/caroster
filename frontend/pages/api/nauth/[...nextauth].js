import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const STRAPI_URL = 'http://localhost:1337';

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Strapi',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            identifier: credentials.email,
            password: credentials.password,
          }),
        });
        const data = await response.json();
        if (data?.error?.message === 'Your account email is not confirmed')
          throw new Error('EmailNotConfirmed');
        else if (!data?.jwt) return null;
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
        const strapiUrl = 'http://localhost:1337';
        const response = await fetch(
          `${STRAPI_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const data = await response.json();
        token.id = data.user.id;
        token.jwt = data.jwt;
        token.email = data.user.email;
        token.username = data.user.firstname;
        token.lang = data.user.lang?.toLowerCase();
        token.provider = account.provider;
        token.userCreatedAt = data.user.createdAt;
      }

      // Strapi Auth
      else if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.email = user.email;
        token.username = user.firstname;
        token.lang = user.lang?.toLowerCase();
        token.provider = account.provider;
        token.userCreatedAt = user.createdAt;
      }

      return token;
    },
    session: async params => {
      const {session, token} = params;
      if (session) {
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
