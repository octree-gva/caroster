interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getAdressCoordinates = async (
  address: string,
  proximity?: string
): Promise<Coordinates> => {
  const coordinates = await fetch(
    '/api/mapbox/geocoding?' +
      new URLSearchParams({
        search: address,
        proximity,
      })
  )
    .then(res => res.json())
    .catch(console.log);

  return coordinates;
};
