import type {NextApiRequest, NextApiResponse} from 'next';
import {
  AddressAutofillCore,
  AddressAutofillFeatureSuggestion,
} from '@mapbox/search-js-core';

const {MAPBOX_TOKEN} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{features: Array<AddressAutofillFeatureSuggestion>}>
) {
  const {locale, sessionToken} = req.query;
  const suggestion = JSON.parse(req.body);

  if (Array.isArray(locale) || Array.isArray(sessionToken)) {
    res.status(422);
    return;
  }

  const autofill = new AddressAutofillCore({
    accessToken: MAPBOX_TOKEN || '',
    language: locale,
  });

  await autofill.suggest(suggestion.original_search_text, {sessionToken});
  const {features} = await autofill.retrieve(suggestion, {sessionToken});
  if (features.length === 0) {
    res.status(404);
    return;
  }

  res.send({features});
  return;
}
