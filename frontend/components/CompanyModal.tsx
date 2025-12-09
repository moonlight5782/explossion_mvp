"use client";

import React, { useState, useEffect, useRef } from "react";
import type { Company } from "../data/companies";
import BookingModal from "./BookingModal";
import BookingCount from "./BookingCount";

type Props = {
  company: Company;
  onClose: () => void;
  lang: "ru" | "ro";
};

export default function CompanyModal({ company, onClose, lang }: Props) {
  const [showBooking, setShowBooking] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const t = {
    ru: { close: "Закрыть", book: "Записаться" },
    ro: { close: "Închide", book: "Programează-te" },
  } as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={company.name[lang]}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-xl mx-4"
      >
        <h3 className="text-xl font-semibold mb-2">{company.name[lang]}</h3>

        {company.description && (
          <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">{company.description[lang]}</p>
        )}

        {/* show number of existing bookings for this company */}
        <BookingCount companyId={company.id} lang={lang} />

        <div className="mb-4">
          <div className="text-sm font-medium mb-2">{lang === "ru" ? "Профессии" : "Profesii"}</div>
          <div className="flex flex-wrap gap-2">
            {company.professions?.map((p, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                {p[lang]}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            {t[lang].close}
          </button>
          <button
            className="px-4 py-2 bg-amber-500 text-white rounded"
            onClick={() => setShowBooking(true)}
          >
            {t[lang].book}
          </button>
        </div>
      </div>

      {showBooking && (
        <BookingModal company={company} onClose={() => setShowBooking(false)} lang={lang} />
      )}
    </div>
  );
}

