type Language = "en" | "id"

type LocalizedText = Record<Language, string>

export interface ExternalWritingItem {
  id: string
  title: LocalizedText
  excerpt: LocalizedText
  platform: string
  url: string
  category: string
  date: LocalizedText
  readTime: LocalizedText
  featured: boolean
  order: number
}

export interface WritingChannel {
  id: string
  name: string
  description: LocalizedText
  url: string
  label: LocalizedText
}

const externalWritingItems: ExternalWritingItem[] = [
  {
    id: "linkedin-architecture-notes",
    title: {
      en: "Architecture Notes from Building Fullstack Products",
      id: "Catatan Arsitektur dari Membangun Produk Fullstack",
    },
    excerpt: {
      en: "Short-form breakdowns about product architecture, frontend decisions, and lessons learned while building scalable web applications.",
      id: "Rangkuman singkat tentang arsitektur produk, keputusan frontend, dan pelajaran dari membangun aplikasi web yang scalable.",
    },
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/aziziem/",
    category: "Architecture",
    date: {
      en: "Updated regularly",
      id: "Diperbarui berkala",
    },
    readTime: {
      en: "3-5 min reads",
      id: "Bacaan 3-5 menit",
    },
    featured: true,
    order: 1,
  },
  {
    id: "github-implementation-writeups",
    title: {
      en: "Implementation Write-ups and Source Notes",
      id: "Catatan Implementasi dan Source Notes",
    },
    excerpt: {
      en: "Technical notes around component structure, portfolio experiments, and practical implementation details from public repositories.",
      id: "Catatan teknis seputar struktur komponen, eksperimen portfolio, dan detail implementasi praktis dari repository publik.",
    },
    platform: "GitHub",
    url: "https://github.com/aziziega",
    category: "Engineering",
    date: {
      en: "Project notes",
      id: "Catatan proyek",
    },
    readTime: {
      en: "Code-first",
      id: "Code-first",
    },
    featured: true,
    order: 2,
  },
  {
    id: "x-build-logs",
    title: {
      en: "Build Logs, UI Experiments, and Quick Takes",
      id: "Build Logs, Eksperimen UI, dan Quick Takes",
    },
    excerpt: {
      en: "Compact updates on what I am building, design details I am exploring, and small engineering lessons worth sharing.",
      id: "Update ringkas tentang hal yang sedang saya bangun, detail desain yang sedang dieksplorasi, dan pelajaran engineering kecil yang layak dibagikan.",
    },
    platform: "X",
    url: "https://x.com/AziZiega",
    category: "Build Log",
    date: {
      en: "Short updates",
      id: "Update singkat",
    },
    readTime: {
      en: "1 min notes",
      id: "Catatan 1 menit",
    },
    featured: false,
    order: 3,
  },
]

const writingChannels: WritingChannel[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    description: {
      en: "Longer reflections on engineering decisions, product thinking, and professional updates.",
      id: "Refleksi lebih panjang tentang keputusan engineering, product thinking, dan update profesional.",
    },
    url: "https://www.linkedin.com/in/aziziem/",
    label: {
      en: "Follow on LinkedIn",
      id: "Ikuti di LinkedIn",
    },
  },
  {
    id: "github",
    name: "GitHub",
    description: {
      en: "Public source code, experiments, and implementation references behind selected projects.",
      id: "Source code publik, eksperimen, dan referensi implementasi di balik beberapa proyek.",
    },
    url: "https://github.com/aziziega",
    label: {
      en: "Browse GitHub",
      id: "Lihat GitHub",
    },
  },
  {
    id: "x",
    name: "X",
    description: {
      en: "Short build notes, quick observations, and lightweight updates from ongoing work.",
      id: "Catatan build singkat, observasi cepat, dan update ringan dari pekerjaan yang sedang berjalan.",
    },
    url: "https://x.com/AziZiega",
    label: {
      en: "Follow on X",
      id: "Ikuti di X",
    },
  },
]

export function getExternalWritingItems(language: Language) {
  return externalWritingItems
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      ...item,
      title: item.title[language],
      excerpt: item.excerpt[language],
      date: item.date[language],
      readTime: item.readTime[language],
    }))
}

export function getFeaturedExternalWriting(language: Language, limit = 3) {
  return getExternalWritingItems(language).slice(0, limit)
}

export function getWritingChannels(language: Language) {
  return writingChannels.map((channel) => ({
    ...channel,
    description: channel.description[language],
    label: channel.label[language],
  }))
}
