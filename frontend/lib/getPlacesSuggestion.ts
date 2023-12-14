interface Params {
  search: string;
  proximity?: string;
  locale: string;
}

export interface PlaceSuggestion {
  place_name: string;
  center: [number, number];
}

const getPlacesSuggestions = async ({
  search,
  proximity,
  locale,
}: Params): Promise<Array<PlaceSuggestion>> => {
  const suggestions = await fetch(
    '/api/mapbox/places?' +
      new URLSearchParams({
        search,
        proximity,
        locale,
      })
  )
    .then(res => res.json())
    .catch(console.error);

  return suggestions;
};

export default getPlacesSuggestions;
