/**
 * Painel lateral que exibe lista de localizações favoritas,
 * permite selecionar para visualizar no mapa e deletar favoritos.
 */
import { useFavoriteStore } from "../store/favoriteStore";

export default function FavoritesPanel({ onSelect }) {
  const favorites = useFavoriteStore((s) => s.favorites);
  const removeFavorite = useFavoriteStore((s) => s.removeFavorite);

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-950/30 dark:to-slate-800/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <span className="text-lg">⭐</span>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-slate-100">Favoritos</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">{favorites.length} {favorites.length === 1 ? "local" : "locais"}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
              <span className="text-2xl">📍</span>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Nenhum favorito salvo</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Clique no mapa para adicionar</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {favorites.map((f) => (
              <li key={f.id} className="hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors duration-150 border-0">
                <div className="p-3 sm:p-4 space-y-3">
                  <button
                    onClick={() => onSelect(f)}
                    className="w-full text-left group focus:outline-none"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 group-hover:scale-150 transition-transform"></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {f.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {f.lat.toFixed(5)}, {f.lng.toFixed(5)}
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => removeFavorite(f.id)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/30 hover:border-red-300 dark:hover:border-red-800/30 transition-all duration-200 flex items-center justify-center gap-2"
                    title="Remover favorito"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}