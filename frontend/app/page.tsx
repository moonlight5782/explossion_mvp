"use client";
import { useMemo, useState } from "react";
import { companies, Company } from "../data/companies";
import { cities } from "../data/cities";
import CitySelector from "../components/CitySelector";
import ProfessionsList from "../components/ProfessionsList";
import CompanyGrid from "../components/CompanyGrid";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const [lang, setLang] = useState<"ru" | "ro">("ru");
  const [search, setSearch] = useState("");

  const texts = {
    ru: {
      header: "Найди идеальную компанию",
      description:
        "Ищите компании по профессии, навыкам или отрасли. Удобная платформа для поиска работы и партнёров.",
      searchPlaceholder: "Frontend, Дизайнер, Электрик...",
      searchBtn: "Найти",
      popular: "Популярные категории",
      footer: "© 2025 — Ваш Стартап. Все права защищены.",
    },
    ro: {
      header: "Găsește compania perfectă",
      description:
        "Caută companii după profesie, abilități sau industrie. O platformă convenabilă pentru a găsi joburi și parteneri.",
      searchPlaceholder: "Frontend, Designer, Electrician...",
      searchBtn: "Cauta",
      popular: "Categorii populare",
      footer: "© 2025 — Startup-ul tău. Toate drepturile rezervate.",
    },
  };

  const t = texts[lang];

  const toggleLang = () => setLang(lang === "ru" ? "ro" : "ru");

  // choose first city that has companies, fallback to first defined city
  const initialCity = useMemo(() => {
    const cityWithCompany = cities.find((ct) => companies.some((c) => c.city === ct.code));
    return cityWithCompany ? cityWithCompany.code : cities[0]?.code ?? "";
  }, []);

  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // derive list of cities from companies data (unique)
  // available cities derived from `cities` data but only those that have at least one company
  const cityOptions = useMemo(() => cities.filter((ct) => companies.some((c) => c.city === ct.code)), []);

  // aggregate professions available in the selected city
  const professionsForCity = useMemo(() => {
    const seen = new Map<string, { ru: string; ro: string }>();
    companies
      .filter((c) => c.city === selectedCity)
      .forEach((c) => {
        c.professions.forEach((p) => {
          const key = p.ru.toLowerCase();
          if (!seen.has(key)) seen.set(key, p);
        });
      });
    return Array.from(seen.entries()).map(([k, v]) => ({ id: k, label: v }));
  }, [selectedCity]);

  // Filter companies by city, profession and search query
  const filteredCompanies = useMemo(() => {
    return companies.filter((c: Company) => {
      if (selectedCity && c.city !== selectedCity) return false;
      if (selectedProfession) {
        const hasProfession = c.professions.some((p) => p.ru.toLowerCase() === selectedProfession);
        if (!hasProfession) return false;
      }
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        c.name[lang].toLowerCase().includes(q) || c.category[lang].toLowerCase().includes(q)
      );
    });
  }, [selectedCity, selectedProfession, search, lang]);

  return (
    <main className="min-h-screen bg-linear-to-b from-orange-50 via-orange-100 to-orange-50 text-gray-900 flex flex-col items-center p-10 relative">

      {/* Кнопки в правом верхнем углу: аккаунт и смена языка */}
      <div className="absolute top-5 right-5 flex items-center gap-3">
        {!showSignup && !showLogin && (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="px-5 py-2 rounded-2xl border-2 border-[#C4926B] bg-white text-[#6B3E2E] font-bold shadow-lg hover:shadow-xl hover:bg-amber-50 transition-all duration-200"
            >
              {lang === "ru" ? "Войти" : "Intră"}
            </button>

            <button
              onClick={() => setShowSignup(true)}
              className="px-5 py-2 rounded-2xl border-2 border-[#C4926B] bg-[#F9C9A2] text-[#6B3E2E] font-bold shadow-lg hover:shadow-xl hover:bg-[#F0B88C] transition-all duration-200"
            >
              {lang === "ru" ? "Зарегистрироваться" : "Înregistrează-te"}
            </button>
          </>
        )}

        <button
          onClick={toggleLang}
          className="px-5 py-2 rounded-2xl border-3 border-[#C4926B] font-bold text-lg bg-white text-[#A67B5B] hover:bg-[#A67B5B] hover:text-white hover:border-[#D4845C] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer"
        >
          {lang.toUpperCase()}
        </button>
      </div>

      {/* Заголовок и описание */}
      <h1 className="text-4xl font-bold text-center mb-3 text-[#6B3E2E] max-w-2xl">
        {t.header}
      </h1>

      <p className="text-center text-gray-700 mb-8 max-w-2xl">
        {t.description}
      </p>

      {/* City selector */}
      <CitySelector
        cities={cityOptions}
        selectedCity={selectedCity}
        setSelectedCity={(c) => {
          setSelectedCity(c);
          setSelectedProfession(null);
        }}
        lang={lang}
      />


      {/* Поле поиска и кнопка */}
      <div className="w-full max-w-2xl mb-12 flex gap-3">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl border-3 border-[#C4926B] text-gray-800 font-medium
                     focus:outline-none focus:ring-2 focus:ring-[#D4845C] placeholder-gray-500
                     bg-white/90 shadow-md hover:shadow-lg transition-all"
        />
        <button
          className="px-7 py-3 rounded-2xl border-2 border-[#C4926B] font-bold text-base
                     bg-[#9B6F47] text-white shadow-lg hover:shadow-xl hover:bg-[#7d5a39]
                     transition-all duration-200 cursor-pointer"
          onClick={() => {
            /* keep search behavior client-side for now */
          }}
        >
          {t.searchBtn}
        </button>
      </div>

      {/* Professions list for selected city (moved below search as requested) */}
      <ProfessionsList
        professions={professionsForCity}
        selectedProfession={selectedProfession}
        setSelectedProfession={setSelectedProfession}
        lang={lang}
      />

      {/* Companies grid */}
      <CompanyGrid companies={filteredCompanies} lang={lang} />

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} lang={lang} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} lang={lang} />}

      {filteredCompanies.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            {lang === "ru" ? "Компании не найдены" : "Nu au fost găsite companii"}
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600 text-sm">
        {t.footer}
      </footer>
    </main>
  );
}
