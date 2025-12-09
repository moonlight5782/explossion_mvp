"use client";

import React, { useState, useEffect, useRef } from "react";
import type { Company } from "../data/companies";

type Props = {
  company: Company;
  onClose: () => void;
  lang: "ru" | "ro";
};

export default function BookingModal({ company, onClose, lang }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const t = {
    ru: { cancel: "Отмена", confirm: "Подтвердить", booked: "Записано", selectTime: "Выберите время" },
    ro: { cancel: "Anulează", confirm: "Confirmă", booked: "Programare efectuată", selectTime: "Alege ora" },
  } as const;

  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  const times = ["09:00", "11:00", "14:00", "16:00"];

  // load existing bookings and compute booked dates for this company
  const key = "explossion_bookings";
  const existingRaw = localStorage.getItem(key) || "[]";
  let existing: Array<{ companyId: number; date: string }> = [];
  try {
    existing = JSON.parse(existingRaw);
  } catch (e) {
    existing = [];
  }

  // store existing as objects possibly with time
  const bookedForCompany = new Map<string, Set<string>>();
  existing
    .filter((b) => b.companyId === company.id)
    .forEach((b) => {
      const date = b.date;
      const time = (b as any).time || "";
      if (!bookedForCompany.has(date)) bookedForCompany.set(date, new Set());
      if (time) bookedForCompany.get(date)!.add(time);
    });

  function confirm() {
    if (!selectedDate || !selectedTime) return;
    const bookedTimes = bookedForCompany.get(selectedDate) || new Set();
    if (bookedTimes.has(selectedTime)) {
      alert(lang === "ru" ? "Это время уже занято" : "Această oră este deja ocupată");
      return;
    }
    const updated = [...existing, { companyId: company.id, date: selectedDate, time: selectedTime }];
    localStorage.setItem(key, JSON.stringify(updated));
    alert(t[lang].booked);
    onClose();
  }

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={company.name[lang] + " booking"}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border-2 border-[#C4926B]"
      >
        <h4 className="font-semibold mb-3 text-[#6B3E2E]">{company.name[lang]}</h4>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {days.map((d) => {
            const isSelected = selectedDate === d;
            const bookedTimes = bookedForCompany.get(d) || new Set();
            const isBooked = bookedTimes.size > 0 && bookedTimes.size === times.length;
            return (
              <button
                key={d}
                disabled={isBooked}
                className={`text-sm p-2 rounded-lg border-2 ${
                  isBooked
                    ? "bg-red-100 text-gray-500 cursor-not-allowed border-red-200"
                    : isSelected
                    ? "bg-green-100 text-[#2a5d34] border-[#C4926B] shadow"
                    : "bg-white border-[#C4926B]"
                }`}
                onClick={() => {
                  setSelectedDate(d);
                  setSelectedTime(null);
                }}
              >
                {new Date(d).toLocaleDateString(lang === "ru" ? "ru-RU" : "ro-RO", {
                  month: "short",
                  day: "numeric",
                })}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <div className="mb-4">
            <div className="text-sm font-medium mb-2 text-[#6B3E2E]">{t[lang].selectTime}</div>
            <div className="flex flex-wrap gap-2">
              {times.map((tm) => {
                const isTaken = (bookedForCompany.get(selectedDate) || new Set()).has(tm);
                const isSelectedTime = selectedTime === tm;
                return (
                  <button
                    key={tm}
                    disabled={isTaken}
                    onClick={() => setSelectedTime(tm)}
                    className={`px-3 py-2 rounded-md border-2 ${
                      isTaken
                        ? "bg-red-100 text-gray-400 border-red-200 cursor-not-allowed"
                        : isSelectedTime
                        ? "bg-green-100 text-[#2a5d34] border-[#C4926B] shadow"
                        : "bg-white border-[#C4926B] text-[#6B3E2E]"
                    }`}
                  >
                    {tm}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-100 rounded-lg border-2 border-[#C4926B] text-[#6B3E2E] shadow-md hover:shadow-lg transition-all" onClick={onClose}>
            {t[lang].cancel}
          </button>
          <button className="px-4 py-2 bg-[#9B6F47] text-white rounded-lg border-2 border-[#C4926B] shadow-lg hover:shadow-xl hover:bg-[#7d5a39] transition-all font-bold" onClick={confirm}>
            {t[lang].confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

