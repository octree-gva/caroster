import type {NextApiRequest, NextApiResponse} from 'next';
import {AddressAutofillCore, AddressAutofillSuggestion} from '@mapbox/search-js-core';

const {MAPBOX_TOKEN} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    suggestions: Array<AddressAutofillSuggestion>
  }>
) {
  const {locale, search, sessionToken} = req.query;

  if (Array.isArray(locale) || Array.isArray(search) || Array.isArray(sessionToken)) {
    res.status(422);
    return
  }
  
  const autofill = new AddressAutofillCore({accessToken: MAPBOX_TOKEN || '', language: locale})
  const {suggestions} = await autofill.suggest(search, {sessionToken})

  if (suggestions.length === 0) {
    res.status(404);
    return;
  }

  res.send({suggestions})
  return;
}
