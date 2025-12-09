export default function SearchBar({ t, search, setSearch }) {
  return (
    <div className="flex gap-2 w-full">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="
          flex-1 px-4 py-2 rounded-xl border border-[#A57C5A]
          bg-white/80 focus:bg-white outline-none shadow-sm
          placeholder-gray-500
        "
      />

      <button
        className="
          px-4 py-2 rounded-xl border border-[#A57C5A]
          bg-[#F9C9A2] hover:bg-[#F7B98A]
          hover:border-[#C28C6A]
          transition-all
          font-semibold
          text-[#6E4A32]
        "
      >
        {t("searchBtn")}
      </button>
    </div>
  );
}
