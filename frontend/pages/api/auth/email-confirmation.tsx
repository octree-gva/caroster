import type {NextApiRequest, NextApiResponse} from 'next';

const {STRAPI_URL = 'http://localhost:1337'} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const confirmation = req.query.confirmation;

  try {
    const response = await fetch(
      `${STRAPI_URL}/api/auth/email-confirmation?confirmation=${confirmation}`
    );
    if (response.redirected) return res.redirect(302, response.url);
    const result = await response.json();
    if (result.error) throw new Error(result.error.name);
  } catch (error) {
    console.error(error);
    return res.redirect(302, '/auth/email-confirmation');
  }
}
