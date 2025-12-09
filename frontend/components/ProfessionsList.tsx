"use client";

import React from "react";

export default function ProfessionsList({
  professions,
  selectedProfession,
  setSelectedProfession,
  lang,
}: {
  professions: { id: string; label: { ru: string; ro: string } }[];
  selectedProfession: string | null;
  setSelectedProfession: (id: string | null) => void;
  lang: "ru" | "ro";
}) {
  if (professions.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mb-6">
      <h3 className="text-lg font-semibold mb-3 text-[#6B3E2E]">
        {lang === "ru" ? "Профессии в городе" : "Profesii în oraș"}
      </h3>

      <div className="flex flex-wrap gap-3">
        {professions.map((p) => {
          const isActive = selectedProfession === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProfession(isActive ? null : p.id)}
              className={`px-4 py-2 rounded-2xl border-2 transition-all duration-200 cursor-pointer font-medium
                ${isActive ? "bg-[#D4845C] text-white border-[#C4926B] shadow-lg" : "bg-white text-[#6B3E2E] border-[#C4926B] hover:shadow-md"}`}
            >
              {p.label[lang]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
