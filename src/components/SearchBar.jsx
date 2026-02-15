/**
 * Componente para buscar endereços usando geocoding.
 * Integra validação, loading e tratamento de erros.
 */
import { useState } from "react";
import { useGeocode } from "../hooks/useGeocode";

export default function SearchBar({ onResult }) {
  const [text, setText] = useState("");
  const { refetch, isFetching, isError, error } = useGeocode(text);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const { data } = await refetch();
    if (data) onResult(data);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      {/* Input Container */}
      <div className="relative group" style={{ height: '40px' }}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Buscar endereço ou local (ex: Praça Tubal Vilela, Uberlândia)"
          className="w-full h-full pl-11 pr-32 sm:pr-28 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent hover:border-slate-300 dark:hover:border-slate-600"
        />

        {text && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-12 pr-3 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title="Limpar busca"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isFetching || !text.trim()}
          className="absolute inset-y-0 right-0 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
        >
          <span>{isFetching ? "Buscando..." : "Buscar"}</span>
          {isFetching && <span className="animate-spin inline-block w-4 h-4">⟳</span>}
        </button>
      </div>

      {/* Error Message */}
      {isError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30 flex items-start gap-3 mt-2">
          <svg className="w-5 h-5 text-red-600 dark:text-red-400 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900 dark:text-red-200">Erro na busca</p>
            <p className="text-xs text-red-700 dark:text-red-300 mt-1">{error?.message || "Não foi possível encontrar o local"}</p>
          </div>
        </div>
      )}
    </form>
  );
}