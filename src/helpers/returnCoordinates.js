
import { Moscow, Tokyo, Ottawa } from "../constants/coordinates";

export function returnCoordinates(city) {
  const lat = city === "Ottawa" ? Ottawa.lattitude : city === "Moscow" ? Moscow.lattitude : city === "Tokyo" ? Tokyo.lattitude : Ottawa.lattitude;
  const lon = city === "Ottawa" ? Ottawa.longitude : city === "Moscow" ? Moscow.longitude : city === "Tokyo" ? Tokyo.longitude : Ottawa.longitude;
  return [lat, lon]
}