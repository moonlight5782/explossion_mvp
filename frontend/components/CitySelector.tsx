"use client";

import React from "react";

type CityOption = { code: string; name: { ru: string; ro: string } };

export default function CitySelector({
  cities,
  selectedCity,
  setSelectedCity,
  lang,
}: {
  cities: CityOption[];
  selectedCity: string;
  setSelectedCity: (cityCode: string) => void;
  lang: "ru" | "ro";
}) {
  return (
    <div className="w-full max-w-2xl mb-4">
      <label className="block text-sm text-gray-600 mb-2">{lang === "ru" ? "Выберите город" : "Alege orașul"}</label>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl border-2 border-[#C4926B] bg-white/95 shadow-md focus:outline-none"
      >
        {cities.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name[lang]}
          </option>
        ))}
      </select>
    </div>
  );
}
