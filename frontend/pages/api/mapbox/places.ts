import type {NextApiRequest, NextApiResponse} from 'next';

type ResponseData = Array<{place_name: string; center: [number, number]}>;

const {MAPBOX_TOKEN, MAPBOX_URL} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {search, proximity = 'ip', locale} = req.query;
  if (!search) return res.status(400);
  else if (!MAPBOX_TOKEN) {
    console.warn('No MAPBOX_TOKEN provided');
    return res.status(500);
  }

  const url = `${MAPBOX_URL}geocoding/v5/mapbox.places/${search}.json?proximity=${proximity}&access_token=${MAPBOX_TOKEN}&language=${locale}`;

  try {
    const response = await fetch(url);
    if (response.status === 429) throw new Error('MAPBOX_RATE_LIMIT_EXCEEDED');
    else if (response.status === 401) throw new Error('MAPBOX_UNAUTHORIZED');
    const mapBoxResult = await response.json();
    if (mapBoxResult?.features)
      return res.status(200).send(mapBoxResult.features);
    else {
      console.warn('MALFORMED RESPONSE FROM MAPBOX', mapBoxResult);
      throw new Error('MAPBOX_MALFORMED_RESPONSE');
    }
  } catch (error) {
    console.error('ERROR WITH MAPBOX: ', error.message);
    res.status(500);
  }
}
