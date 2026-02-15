/**
 * Componente principal que organiza o layout com header, mapa,
 * barra de busca, painel de favoritos e controle de tema.
 */
import { useState } from "react";
import GoogleMap from "./components/Map";
import FavoritesPanel from "./components/FavoritesPanel";
import SearchBar from "./components/SearchBar";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const [activePlace, setActivePlace] = useState(null);
  const [searchPlace, setSearchPlace] = useState(null);
  const [showMobileFavorites, setShowMobileFavorites] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">

      <header className="flex-shrink-0 border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
        <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg flex-shrink-0">
              <span className="text-lg">🗺️</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">MapApp</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Gerenciador de Localizações</p>
            </div>
            <h1 className="sm:hidden text-xl font-bold text-slate-900 dark:text-slate-100">MapApp</h1>
          </div>


          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
            >
              {theme === "light" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setShowMobileFavorites(!showMobileFavorites)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              <span>⭐</span>
              <span className="text-sm font-medium">Favoritos</span>
            </button>
          </div>
        </div>
      </header>


      <main className="flex-1 flex flex-col overflow-hidden">

        <div className="flex-shrink-0 border-b border-slate-200/30 dark:border-slate-700/30 bg-white/40 dark:bg-slate-900/40 backdrop-blur px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar
            onResult={(data) => {
              setActivePlace(null);
              setSearchPlace(data);
            }}
          />
        </div>


        <div className="flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-0">

            <div className="lg:col-span-3 overflow-hidden flex flex-col">
              <GoogleMap 
                activePlace={activePlace} 
                searchPlace={searchPlace} 
              />
            </div>


            <div className="hidden lg:flex lg:col-span-1 border-l border-slate-200/50 dark:border-slate-700/50 overflow-hidden flex-col bg-white dark:bg-slate-900">
              <FavoritesPanel 
                onSelect={(fav) => { 
                  setSearchPlace(null); 
                  setActivePlace(fav); 
                }} 
              />
            </div>


            {showMobileFavorites && (
              <div className="lg:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setShowMobileFavorites(false)} />
            )}
            {showMobileFavorites && (
              <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-slate-900 rounded-t-2xl shadow-2xl max-h-[70vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <h2 className="font-bold text-slate-900 dark:text-slate-100">Favoritos</h2>
                  <button
                    onClick={() => setShowMobileFavorites(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-900 dark:text-slate-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <FavoritesPanel 
                    onSelect={(fav) => { 
                      setSearchPlace(null); 
                      setActivePlace(fav);
                      setShowMobileFavorites(false);
                    }} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>


      <footer className="flex-shrink-0 border-t border-slate-200/50 bg-white/40 backdrop-blur py-3 px-4 text-center text-xs text-slate-600">
        <p>© 2026 MapApp • React + Google Maps</p>
      </footer>
    </div>
  );
}