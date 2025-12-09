"use client";

import React, { useEffect, useState } from "react";

export default function BookingCount({ companyId, lang }: { companyId: number; lang: "ru" | "ro" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const key = "explossion_bookings";
    try {
      const raw = localStorage.getItem(key) || "[]";
      const arr = JSON.parse(raw);
      setCount(arr.filter((b: any) => b.companyId === companyId).length);
    } catch (e) {
      setCount(0);
    }
  }, [companyId]);

  if (count === 0) return null;

  return (
    <div className="text-sm text-gray-600 mb-3">
      {lang === "ru" ? `Забронировано дат: ${count}` : `Date rezervate: ${count}`}
    </div>
  );
}
