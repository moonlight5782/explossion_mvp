export type LocalizedString = { ru: string; ro: string };

export type Company = {
  id: number;
  name: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  // address localized
  address?: LocalizedString;
  // city code for filtering (e.g. "chisinau", "bucuresti")
  city: string;
  // professions available in this company (localized)
  professions: LocalizedString[];
};

export const companies: Company[] = [
  {
    id: 1,
    name: { ru: "TechMasters", ro: "TechMasters" },
    category: { ru: "Разработчики", ro: "Dezvoltatori" },
    description: { ru: "Frontend и backend разработка", ro: "Dezvoltare frontend și backend" },
    address: { ru: "ул. Штефан чел маре, 10, Кишинёв", ro: "str. Ștefan cel Mare 10, Chișinău" },
    city: "chisinau",
    professions: [
      { ru: "Frontend", ro: "Frontend" },
      { ru: "Backend", ro: "Backend" },
      { ru: "DevOps", ro: "DevOps" },
    ],
  },
  {
    id: 2,
    name: { ru: "DesignPro", ro: "DesignPro" },
    category: { ru: "Дизайнеры", ro: "Designeri" },
    description: { ru: "UI/UX дизайн для стартапов", ro: "Design UI/UX pentru startup-uri" },
    address: { ru: "ул. Короленко, 5, Бэлць", ro: "str. Korolenko 5, Bălți" },
    city: "balti",
    professions: [
      { ru: "UI/UX", ro: "UI/UX" },
      { ru: "Product Design", ro: "Design de produs" },
      { ru: "Illustrator", ro: "Illustrator" },
    ],
  },
  {
    id: 3,
    name: { ru: "FinCorp", ro: "FinCorp" },
    category: { ru: "Финтех", ro: "Fintech" },
    description: { ru: "Финансовые решения и аналитика", ro: "Soluții financiare și analiză" },
    address: { ru: "пр. Тираспольский, 12, Тирасполь", ro: "bd. Tiraspol 12, Tiraspol" },
    city: "tiraspol",
    professions: [
      { ru: "Аналитик", ro: "Analist" },
      { ru: "Финансы", ro: "Finanțe" },
    ],
  },
  {
    id: 4,
    name: { ru: "GameZone", ro: "GameZone" },
    category: { ru: "Гейминг", ro: "Gaming" },
    description: { ru: "Разработка игр и гейм-дизайн", ro: "Dezvoltare jocuri și game design" },
    address: { ru: "ул. Гагарина, 3, Кахул", ro: "str. Gagarin 3, Cahul" },
    city: "cahul",
    professions: [
      { ru: "Гейм-дизайн", ro: "Game design" },
      { ru: "3D Artist", ro: "Artist 3D" },
    ],
  },
  {
    id: 5,
    name: { ru: "ElectroMax", ro: "ElectroMax" },
    category: { ru: "Электрики", ro: "Electricieni" },
    description: { ru: "Электромонтажные работы", ro: "Lucrări de instalare electrică" },
    address: { ru: "ул. Победы, 20, Сорока", ro: "str. Victoriei 20, Soroca" },
    city: "soroca",
    professions: [
      { ru: "Электрик", ro: "Electrician" },
      { ru: "Монтажник", ro: "Montator" },
    ],
  },
  {
    id: 6,
    name: { ru: "MarketGurus", ro: "MarketGurus" },
    category: { ru: "Маркетинг", ro: "Marketing" },
    description: { ru: "Digital и контент-маркетинг", ro: "Marketing digital și conținut" },
    address: { ru: "ул. Пушкина, 8, Унгены", ro: "str. Pușkin 8, Ungheni" },
    city: "ungheni",
    professions: [
      { ru: "Маркетинг", ro: "Marketing" },
      { ru: "SMM", ro: "SMM" },
    ],
  },
];

export default companies;
