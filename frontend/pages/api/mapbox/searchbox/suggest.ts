import type {NextApiRequest, NextApiResponse} from 'next';

export type MapboxSuggestion = {name: string; mapbox_id: string, address: string; place_formatted: string};

const {MAPBOX_TOKEN, MAPBOX_URL} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<MapboxSuggestion>>
) {
  const {search, proximity = 'ip', sessionToken, locale} = req.query;
  if (!search) return res.status(400).send(null);
  else if (!MAPBOX_TOKEN) return res.status(500).send(null);

  const url = `${MAPBOX_URL}search/searchbox/v1/suggest?q=${search}&proximity=${proximity}&language=${locale}&access_token=${MAPBOX_TOKEN}&session_token=${sessionToken}`;

  const mapBoxResult = await fetch(url)
    .then(response => {
      if (response.status === 429) {
        throw 'MAPBOX_RATE_LIMIT_EXCEEDED';
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });

  if (mapBoxResult?.suggestions) {
    console.log(url)
    res.status(200).send(mapBoxResult.suggestions);
    return;
  }
  res.send([]);
}
