"use client";

export default function LanguageSwitcher({ lang, setLang }: { lang: string; setLang: (lang: string) => void }) {
  const toggleLang = () => {
    setLang(lang === "ru" ? "en" : "ru");
  };

  return (
    <button
      onClick={toggleLang}
      className="
        px-3 py-1 rounded-lg border border-[#A57C5A]
        bg-[#FFF1E6] hover:bg-[#F8D7BD]
        transition-colors font-semibold text-[#6E4A32]
      "
    >
      {lang.toUpperCase()}
    </button>
  );
}
