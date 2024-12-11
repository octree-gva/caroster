import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const confirmation = req.query.confirmation;

  try {
    const response = await fetch(
      `http://127.0.0.1:1337/api/auth/email-confirmation?confirmation=${confirmation}`
    );
    if (response.redirected)
      return res.redirect(302, '/auth/login?confirmed=true');
    const result = await response.json();
    if (result.error) throw new Error(result.error.name);
  } catch (error) {
    console.error(error);
    return res.redirect(302, '/auth/email-confirmation');
  }
}
