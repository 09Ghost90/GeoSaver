/**
 * Store global para gerenciar favoritos com persistência em localStorage.
 * Fornece métodos para adicionar e remover localizações favoritas.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteStore = create(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: ({ name, lat, lng}) => {
                const id = crypto.randomUUID();
                set({ favorites: [{ id, name, lat, lng }, ...get().favorites] });
            },

            removeFavorite: (id) => {
                set({ favorites: get().favorites.filter(fav => fav.id !== id) });
            },
        }),
        { name: "favorite-storage" }
    )
)