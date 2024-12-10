import {getToken} from 'next-auth/jwt';
import {NextRequest, NextResponse} from 'next/server';
import {
  ProfileDocument,
  Enum_Userspermissionsuser_Lang as SupportedLocales,
} from './generated/graphql';
import {print} from 'graphql/language/printer';
import {getCookie} from './lib/cookies';

const PUBLIC_FILE = /\.(.*)$/;
const FALLBACK_LANGUAGE = process.env.FALLBACK_LANGUAGE || 'en';

export async function middleware(req: NextRequest) {
  const isIgnoredPath =
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    req.nextUrl.pathname.startsWith('/graphql') ||
    PUBLIC_FILE.test(req.nextUrl.pathname);

  if (isIgnoredPath) return null;

  const locale =
    (await getRegisteredUserLanguage(req)) ||
    getCookie('NEXT_LOCALE', req.headers.get('cookie')) ||
    getBrowserPreferredSupportedLanguage(req) ||
    FALLBACK_LANGUAGE;

  if (req.nextUrl.locale !== locale) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}${req.nextUrl.search || ''}`,
        req.url
      )
    );
  }
}

const getRegisteredUserLanguage = async req => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const {STRAPI_URL = 'http://localhost:1337'} = process.env;
  return fetch(`${STRAPI_URL}/graphql/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token?.jwt ? `Bearer ${token.jwt}` : '',
    },
    body: JSON.stringify({query: print(ProfileDocument)}),
  })
    .then(async response => {
      const {data} = await response.json();
      if (data?.me?.profile?.provider === 'local')
        return data?.me?.profile?.lang;
    })
    .catch(console.error);
};

const getBrowserPreferredSupportedLanguage = (req): SupportedLocales => {
  const browserAcceptedLanguages = req.headers
    .get('accept-language')
    ?.split(',');
  let browserPreferredSupportedLanguage = null;
  browserAcceptedLanguages?.every(locale => {
    const lang = locale.split('-')?.[0].toLowerCase();

    if (Object.keys(SupportedLocales).includes(lang)) {
      browserPreferredSupportedLanguage = lang;
    } else {
      return false;
    }
  });
  return browserPreferredSupportedLanguage;
};
