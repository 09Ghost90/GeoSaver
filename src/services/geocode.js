/**
 * Serviço para fazer geocoding (traduzir endereço em coordenadas)
 * usando a Google Geocoding API.
 */
export async function geocodeAddress(query) {
  const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const url =
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query
    )}&key=${key}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "OK") {
    throw new Error(data.error_message || data.status || "Erro no Geocoding");
  }

  const result = data.results[0];
  const loc = result.geometry.location;

  return {
    formattedAddress: result.formatted_address,
    lat: loc.lat,
    lng: loc.lng,
  };
}