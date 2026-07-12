import React from 'react';
import { MOVIE_GENRES, PLACE_TYPES, SERIES_GENRES, GAME_TYPES } from '../constants/preferences';

export const PreferenceSelect = ({ label, name, value, onChange, className = '' }) => {
  let options = [];
  if (name === 'favMovieGenre') options = MOVIE_GENRES;
  else if (name === 'favPlaceType') options = PLACE_TYPES;
  else if (name === 'favSeriesGenre') options = SERIES_GENRES;
  else if (name === 'favGameType') options = GAME_TYPES;

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-300 focus:border-purple-500/50 focus:outline-none transition-all duration-300 cursor-pointer ${className}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-950 text-slate-300">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PreferenceSelect;
