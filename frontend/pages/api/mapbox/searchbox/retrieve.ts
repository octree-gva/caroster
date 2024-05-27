import type {NextApiRequest, NextApiResponse} from 'next';

export type GeocodedOption = {name: string, coordinates: {latitude, longitude}};

const {MAPBOX_TOKEN, MAPBOX_URL} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeocodedOption>
) {
  const {id, sessionToken = 'ip', locale} = req.query;
  if (!id) return res.status(400).send(null);
  else if (!MAPBOX_TOKEN) return res.status(500).send(null);

  const url = `${MAPBOX_URL}search/searchbox/v1/retrieve/${id}?language=${locale}&access_token=${MAPBOX_TOKEN}&session_token=${sessionToken}`;

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

  if (mapBoxResult?.features?.length > 0) {
    res.status(200).send(mapBoxResult.features[0].properties);
    return;
  }
  res.status(500).send(null);
}
