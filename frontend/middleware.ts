import {getToken} from 'next-auth/jwt';
import {NextRequest, NextResponse} from 'next/server';
import {
  ProfileDocument,
  Enum_Userspermissionsuser_Lang as SupportedLocales,
} from './generated/graphql';
import {print} from 'graphql/language/printer';
import {getCookie} from './lib/cookies';

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'share';

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    req.nextUrl.pathname === '/graphql' ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === DEFAULT_LOCALE) {
    const registeredUserLanguage = await getRegisteredUserLanguage(req);
    const NEXT_LOCALE = getCookie('NEXT_LOCALE', req.headers.get('cookie'));
    const browserPreferredSupportedLanguage =
      getBrowserPreferredSupportedLanguage(req);

    const locale =
      registeredUserLanguage ||
      NEXT_LOCALE ||
      browserPreferredSupportedLanguage ||
      'fr';

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}`, req.url)
    );
  }
}

const getRegisteredUserLanguage = async req => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const {STRAPI_URL = 'http://localhost:1337'} = process.env;
  return fetch(`${STRAPI_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token?.jwt ? `Bearer ${token.jwt}` : '',
    },
    body: JSON.stringify({query: print(ProfileDocument)}),
  })
    .then(async response => {
      const {data} = await response.json();
      return data?.me?.profile?.lang;
    })
    .catch(console.log);
};

const getBrowserPreferredSupportedLanguage = req => {
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
