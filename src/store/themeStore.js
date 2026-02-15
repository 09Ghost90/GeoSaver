/**
 * Store global para gerenciar tema (claro/escuro) e estilos do Google Maps.
 * Persiste a preferência do usuário em localStorage.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#e0e0e0" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#373737" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c0c0c0" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a8a8a8" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#2a2a2a" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d0d0d0" }],
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [{ color: "#2a2a2a" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1f3d1f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a8c5a8" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#2c2c2c" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a0a0a0" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#353535" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3e3e3e" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#4a4a4a" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#808080" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2a2a3a" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a0a0c0" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0a1a3a" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4a8ac0" }],
  },
];

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          
          return { theme: newTheme };
        }),

      setTheme: (theme) =>
        set(() => {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          
          return { theme };
        }),
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }
  )
);
