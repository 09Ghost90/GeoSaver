/**
 * Componente para renderizar o Google Maps, gerenciar marcadores,
 * sincronizar temas e integrar com o sistema de favoritos.
 */
import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { useFavoriteStore } from "../store/favoriteStore";
import { useThemeStore, darkMapStyles } from "../store/themeStore";

export default function GoogleMap({ onLocationSelect, activePlace, searchPlace }) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mapError, setMapError] = useState(null);

  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    let cancelled = false;
    const optionsSetRef = { current: false };

    (async () => {
      try {
        const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;

        if (!key) {
          setMapError("Chave de API não configurada");
          console.error("VITE_GOOGLE_MAPS_KEY não está definida.");
          return;
        }

        if (!optionsSetRef.current) {
          setOptions({ key, version: "weekly" });
          optionsSetRef.current = true;
        }

        await importLibrary("maps");
        if (cancelled || !mapDivRef.current) return;

        await new Promise((resolve) => setTimeout(resolve, 100));

        const center = { lat: -18.9146, lng: -48.2754 };

        const mapStyles = theme === "dark" ? darkMapStyles : null;
        
        mapRef.current = new google.maps.Map(mapDivRef.current, {
          center,
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          scrollwheel: true,
          gestureHandling: "greedy",
          styles: mapStyles,
        });

        mapRef.current.addListener("click", (e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          const point = { lat, lng };

          setSelectedLocation(point);

          if (mapRef.current.currentMarker) {
            mapRef.current.currentMarker.setMap(null);
          }

          const marker = new google.maps.Marker({
            position: point,
            map: mapRef.current,
            title: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
            animation: google.maps.Animation.DROP,
          });

          mapRef.current.currentMarker = marker;
          onLocationSelect?.(point);
        });
      } catch (err) {
        console.error("Erro ao inicializar mapa:", err);
        setMapError("Erro ao carregar o mapa. Por favor, recarregue a página.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onLocationSelect]);

  useEffect(() => {
    if (!mapRef.current) return;
    
    const mapStyles = theme === "dark" ? darkMapStyles : null;
    mapRef.current.setOptions({
      styles: mapStyles,
    });
  }, [theme]);

  useEffect(() => {
    if (!activePlace || !mapRef.current) return;

    const point = { lat: activePlace.lat, lng: activePlace.lng };
    mapRef.current.panTo(point);
    mapRef.current.setZoom(15);

    if (mapRef.current.currentMarker) {
      mapRef.current.currentMarker.setMap(null);
    }

    const marker = new google.maps.Marker({
      position: point,
      map: mapRef.current,
      title: activePlace.name || "Favorito",
      animation: google.maps.Animation.DROP,
    });

    mapRef.current.currentMarker = marker;
    setSelectedLocation(point);
  }, [activePlace]);

  useEffect(() => {
    if (!searchPlace || !mapRef.current) return;

    const point = { lat: searchPlace.lat, lng: searchPlace.lng };
    mapRef.current.panTo(point);
    mapRef.current.setZoom(16);

    if (mapRef.current.currentMarker) {
      mapRef.current.currentMarker.setMap(null);
    }

    const marker = new google.maps.Marker({
      position: point,
      map: mapRef.current,
      title: searchPlace.formattedAddress || "Busca",
      animation: google.maps.Animation.DROP,
    });

    mapRef.current.currentMarker = marker;
    setSelectedLocation(point);
  }, [searchPlace]);

  const handleSave = async () => {
    if (!selectedLocation) {
      alert("Selecione uma localização no mapa primeiro");
      return;
    }

    const name = prompt("Nome do local (ex: Casa, Trabalho):", "Local Favorito");
    if (!name?.trim()) return;

    try {
      setIsSaving(true);
      await new Promise((r) => setTimeout(r, 300));

      addFavorite({
        name: name.trim(),
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar o local");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-slate-900">
      {/* Mapa Container */}
      <div className="flex-1 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        {mapError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
            <svg className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9 9 0 1019.02 19.02M7.08 6.47L4.5 3.88m11.56 15.29l2.58 2.58" />
            </svg>
            <p className="text-slate-900 dark:text-slate-100 font-semibold mb-1">Erro ao carregar mapa</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm text-center">{mapError}</p>
          </div>
        ) : (
          <div ref={mapDivRef} className="w-full h-full" />
        )}
      </div>

      {/* Info Panel - Positioned at bottom */}
      {selectedLocation && (
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 sm:p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-y-auto max-h-40 sm:max-h-48">
          {/* Coordenadas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/30 dark:to-slate-800/30 border border-blue-100 dark:border-blue-900/30">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Latitude</p>
              <p className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">{selectedLocation.lat.toFixed(6)}</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/30 dark:to-slate-800/30 border border-blue-100 dark:border-blue-900/30">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Longitude</p>
              <p className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">{selectedLocation.lng.toFixed(6)}</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              saveSuccess
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                : isSaving
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md opacity-75 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95"
            }`}
          >
            {saveSuccess ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Salvo com sucesso!</span>
              </>
            ) : isSaving ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <span>Salvar Local</span>
              </>
            )}
          </button>
        </div>
      )}

      {!selectedLocation && (
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 sm:p-5 text-center">
          <div className="flex justify-center mb-2">
            <span className="text-3xl">👆</span>
          </div>
          <p className="text-slate-900 dark:text-slate-100 font-semibold text-sm mb-1">Clique no mapa</p>
          <p className="text-slate-600 dark:text-slate-400 text-xs">Selecione uma localização para adicionar aos favoritos</p>
        </div>
      )}
    </div>
  );
}