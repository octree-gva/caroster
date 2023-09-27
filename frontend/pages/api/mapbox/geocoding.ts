import {type LatLngExpression} from 'leaflet';
import type {NextApiRequest, NextApiResponse} from 'next';

type ResponseData = {
  coordonates: LatLngExpression;
};

const {MAPBOX_API_KEY, MAPBOX_URL} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!MAPBOX_API_KEY) return res.status(404);

  const {search, proximity = 'ip'} = req.body;
  const url = `${MAPBOX_URL}/geocoding/v5/mapbox.places/${search}?proximity=${proximity}&access_token=${MAPBOX_API_KEY}`;

  const mapBoxResult = fetch(url);
  console.log(mapBoxResult);

  res.status(200);
}
