"use client";

export default function SearchBar({ t, search, setSearch }) {
  return (
    <div className="w-full max-w-xl flex gap-3 mb-16">
      <input
        type="text"
        placeholder={t.searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <button
        className={
          "px-6 py-3 rounded-xl border-2 border-[#C4926B] bg-white text-[#A67B5B] font-semibold transition-all duration-300 ease-in-out hover:bg-[#FFD8BE] hover:shadow-md"
        }
      >
        {t.searchBtn || t.findBtn}
      </button>
    </div>
  );
}
