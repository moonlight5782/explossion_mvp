"use client";

import React, { useState } from "react";
import type { Company } from "../data/companies";
import CompanyModal from "./CompanyModal";

export default function CompanyGrid({ companies, lang }: { companies: Company[]; lang: "ru" | "ro" }) {
  const [openedCompany, setOpenedCompany] = useState<Company | null>(null);

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {companies.map((company) => (
        <div
          key={company.id}
          className="relative p-6 bg-amber-50 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-t-4 border-[#A67B5B] hover:border-[#D4845C]"
        >
          <button
            onClick={() => setOpenedCompany(company)}
            title={lang === "ru" ? "Инфо" : "Info"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border flex items-center justify-center text-sm shadow"
          >
            i
          </button>

          <h2 className="text-xl font-bold text-[#6B3E2E] mb-1">{company.name[lang]}</h2>

          <p className="text-sm font-semibold text-[#D4845C] mb-2">{company.category[lang]}</p>

          <p className="text-gray-700 text-sm leading-relaxed mb-3">{company.description[lang]}</p>

          {company.address && (
            <p className="text-sm text-gray-600 mb-3">{company.address[lang]}</p>
          )}

          <div className="text-sm text-gray-600 mb-3">
            <strong className="block mb-1">{lang === "ru" ? "Профессии:" : "Profesii:"}</strong>
            <div className="mt-1 flex flex-wrap gap-2">
              {company.professions.map((p, i) => (
                <span key={i} className="px-2 py-1 bg-white rounded-md text-xs border border-[#C4926B]">
                  {p[lang]}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setOpenedCompany(company)}
              className="px-4 py-2 rounded-2xl bg-[#9B6F47] text-white border-2 border-[#C4926B] shadow-lg hover:shadow-xl hover:bg-[#7d5a39] transition-all duration-200 font-bold"
            >
              {lang === "ru" ? "Записаться" : "Înregistrează-te"}
            </button>
          </div>
        </div>
      ))}

      {openedCompany && (
        <CompanyModal company={openedCompany} lang={lang} onClose={() => setOpenedCompany(null)} />
      )}
    </div>
  );
}
