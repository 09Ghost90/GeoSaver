/**
 * Hook para buscar endereços usando Google Geocoding API.
 * Integra-se com React Query para gerenciar cache e loading states.
 */
import { useQuery } from "@tanstack/react-query";
import { geocodeAddress } from "../services/geocode";

export function useGeocode(searchText) {
  return useQuery({
    queryKey: ["geocode", searchText],
    queryFn: () => geocodeAddress(searchText),
    enabled: false,
    retry: 1,
  });
}