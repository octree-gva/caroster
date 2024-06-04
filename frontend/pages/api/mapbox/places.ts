import type {NextApiRequest, NextApiResponse} from 'next';

type ResponseData = Array<{place_name: string; center: [number, number]}>;

const {MAPBOX_TOKEN, MAPBOX_URL} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {search, proximity = 'ip', locale} = req.query;
  if (!search) return res.status(400).send(null);
  else if (!MAPBOX_TOKEN) return res.status(500).send(null);

  const url = `${MAPBOX_URL}geocoding/v5/mapbox.places/${search}.json?proximity=${proximity}&access_token=${MAPBOX_TOKEN}&language=${locale}`;

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

  if (mapBoxResult?.features) {
    res.status(200).send(mapBoxResult.features);
    return;
  }
  res.status(500).send(null);
}
