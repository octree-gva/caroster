import type {NextApiRequest, NextApiResponse} from 'next';

type ResponseData = {
  latitude: Number;
  longitude: Number;
};

const {MAPBOX_TOKEN, MAPBOX_URL} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {search, proximity = 'ip'} = req.query;
  console.log({search, proximity});
  if (!MAPBOX_TOKEN || !search) return res.status(404);

  const url = `${MAPBOX_URL}geocoding/v5/mapbox.places/${search}.json?proximity=${proximity}&access_token=${MAPBOX_TOKEN}`;

  const mapBoxResult = await fetch(url)
    .then(response => response.json())
    .catch(err => console.log({err}));

  if (mapBoxResult?.features) {
    res.status(200);
    const features = mapBoxResult.features;
    const firstCompatibleFeature = features.find(feature => {
      return feature.geometry.type === 'Point';
    });
    const coordinates = {
      latitude: firstCompatibleFeature?.geometry?.coordinates[1],
      longitude: firstCompatibleFeature?.geometry?.coordinates[0],
    };
    return res.send(coordinates);
  }

  return res.status(404);
}
