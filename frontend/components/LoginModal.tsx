"use client";

import React, { useState } from "react";

export default function LoginModal({ onClose, lang }: { onClose: () => void; lang: "ru" | "ro" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    const key = "explossion_user";
    const user = { email, provider: "local", createdAt: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(user));
    alert(lang === "ru" ? "Вход выполнен" : "Autentificat");
    onClose();
  }

  function signInWithGoogle() {
    const key = "explossion_user";
    const user = { name: lang === "ru" ? "Пользователь Google" : "Utilizator Google", email: "google@user.local", provider: "google" };
    localStorage.setItem(key, JSON.stringify(user));
    alert(lang === "ru" ? "Вход через Google" : "Autentificare cu Google");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <h3 className="text-lg font-semibold mb-3">{lang === "ru" ? "Войти" : "Autentificare"}</h3>

        <label className="block text-sm mb-2">Email</label>
        <input className="w-full px-3 py-2 mb-3 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="block text-sm mb-2">{lang === "ru" ? "Пароль" : "Parolă"}</label>
        <input type="password" className="w-full px-3 py-2 mb-3 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="flex justify-between gap-2">
          <button className="px-4 py-2 bg-gray-100 rounded-lg border-2 border-[#C4926B] text-[#6B3E2E] shadow-md hover:shadow-lg transition-all" onClick={onClose}>{lang === "ru" ? "Отмена" : "Anulează"}</button>
          <button className="px-4 py-2 bg-[#9B6F47] text-white rounded-lg border-2 border-[#C4926B] shadow-lg hover:shadow-xl hover:bg-[#7d5a39] transition-all font-bold" onClick={submit}>{lang === "ru" ? "Войти" : "Intră"}</button>
        </div>

        <div className="mt-3">
          <button onClick={signInWithGoogle} className="w-full px-4 py-2 rounded-lg border-2 border-[#C4926B] bg-white text-[#6B3E2E] shadow-md hover:shadow-lg transition-all font-semibold">
            {lang === "ru" ? "Войти через Google" : "Autentificare cu Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
