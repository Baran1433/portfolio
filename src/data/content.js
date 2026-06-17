import {
  Code2,
  Database,
  GitBranch,
  Globe,
  Layout,
  Server,
  Smartphone,
  Terminal,
} from "lucide-react";

export const stats = [
  {
    id: "projects",
    value: 5,
    suffix: "+",
    label: { tr: "Tamamlanan Proje", en: "Completed Projects" },
  },
  {
    id: "experience",
    value: 2,
    suffix: "+",
    label: { tr: "Yıl Deneyim", en: "Years Experience" },
  },
  {
    id: "technologies",
    value: 15,
    suffix: "+",
    label: { tr: "Kullanılan Teknoloji", en: "Used Technology" },
  },
  {
    id: "commits",
    value: 10,
    suffix: "+",
    label: { tr: "Kod Katkısı", en: "Code Contributions" },
  },
];

export const skills = [
  { name: "Html-Css", icon: Globe },
  { name: "JavaScript", icon: Code2 },
  { name: "Vue", icon: Code2 },
  { name: "Python", icon: Server },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: GitBranch },
];

export const projects = [
  {
    id: 1,
    image: "/assets/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202026-06-14%20223558.png",
    screenshots: [
      "/assets/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202026-06-14%20223558.png",
      "/assets/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202026-06-14%20223740.png",
      "/assets/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202026-06-14%20223807.png",
    ],
    tags: ["html", "css", "js", "json"],
    github: "https://github.com/baranucar/kibris-rehberim",
    title: { tr: "Kıbrıs Rehberim", en: "Cyprus Guide" },
    desc: {
      tr: "Kıbrıs için gezi rotaları, mekanlar ve kamp alanları sunan rehber uygulaması.",
      en: "A guide app for Cyprus with routes, venues and travel tips.",
    },
  },
  {
    id: 2,
    image: "/assets/halisaha-1.png",
    screenshots: [
      "/assets/halisaha-1.png",
      "/assets/halisaha-2.png",
      "/assets/halisaha-3.png",
      "/assets/halisaha-4.png",
    ],
    tags: ["flutter", "html", "js", "css"],
    github: "https://github.com/baranucar/hali-saha-randevu",
    title: { tr: "Halı Saha Randevu Uygulaması", en: "Soccer Field Booking" },
    desc: {
      tr: "Hızlı rezervasyon, saha takibi ve bildirim özelliklerine sahip bir rezervasyon sistemi.",
      en: "Booking system with fast reservations, field tracking and notifications.",
    },
  },
  {
    id: 3,
    image: "/assets/portfolio-1.png",
    screenshots: [
      "/assets/portfolio-1.png",
      "/assets/portfolio-2.png",
      "/assets/portfolio-3.png",
      "/assets/portfolio-4.png",
    ],
    tags: ["html", "css", "js", "package.json"],
    github: "https://github.com/baranucar/personal-portfolio",
    title: { tr: "Kişisel Portföy Sitesi", en: "Personal Portfolio Site" },
    desc: {
      tr: "Modern, performanslı ve mobil uyumlu portföy sitesi tasarımı.",
      en: "A modern, high-performance and mobile-friendly portfolio website.",
    },
  },
];

export const experiences = [
  {
    period: "2025 — 2026",
    title: { tr: "Etkinlik ve İletişim Sorumlusu", en: "Events & Communications Coordinator" },
    company: { tr: "Girne Üniversitesi Yazılım Kulübü", en: "Girne University Software Club" },
    desc: {
      tr: "Kulüp etkinliklerinin planlanması ve organizasyon süreçlerinde görev aldım. Üyeler arasındaki iletişimin güçlendirilmesi, etkinlik duyurularının yönetilmesi ve topluluk faaliyetlerinin koordinasyonunda sorumluluk üstlendim.",
      en: "I was involved in planning and organizing club events. I was responsible for strengthening communication among members, managing event announcements, and coordinating community activities.",
    },
  },
  {
    period: "2024 — 2025",
    title: { tr: "Yazılım Geliştirme Stajyeri", en: "Software Development Intern" },
    company: { tr: "Elma Telekom", en: "Elma Telecom" },
    desc: {
      tr: "Python, Django ve web geliştirme süreçleri üzerine eğitimler aldım ve uygulama çalışmaları gerçekleştirdim. Yazılım geliştirme süreçlerine katılarak teknik bilgi ve deneyim kazandım.",
      en: "I received training and worked on projects focused on Python, Django, and web development processes. I participated in software development workflows and gained technical knowledge and experience.",
    },
  },
];

export const education = [
  {
    period: "2023 — Devam",
    title: { tr: "Yazılım Mühendisliği", en: "Software Engineering" },
    school: { tr: "Girne Üniversitesi", en: "Girne University" },
    desc: { tr: "Lisans Programı", en: "Bachelor's Program" },
  },
  {
    period: "2015 — 2019",
    title: { tr: "Gazi Anadolu Lisesi", en: "Gazi Anatolian High School" },
    school: { tr: "Sayısal Bölüm", en: "Science Division" },
    desc: {
      tr: "Matematik ve fen bilimleri ağırlıklı eğitim aldım.",
      en: "I received education with a focus on mathematics and science.",
    },
  },
];

export const certificates = [
  {
    id: "webinar-certificate",
    type: "image",
    image: "/assets/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202026-06-15%20071929.png",
    title: { tr: "Full Stack Developer Webinar Sertifikası", en: "Full Stack Developer Webinar Certificate" },
    issuer: { tr: "Talentcoders", en: "Talentcoders" },
    year: "2025",
  },
  {
    id: "code-genius-certificate",
    type: "image",
    image: "/assets/WhatsApp%20Image%202026-02-25%20at%2019.31.34.jpeg",
    title: { tr: "Code Genius Sertifikası", en: "Code Genius Certificate" },
    issuer: { tr: "Code Genius", en: "Code Genius" },
    year: "2026",
  },
  {
    id: "gamejam-medal",
    type: "image",
    image: "/assets/ChatGPT%20Image%2015%20Haz%202026%2008_41_44.png",
    title: { tr: "GameJam Yarışması Madalyası", en: "GameJam Competition Medal" },
    issuer: { tr: "GameJam", en: "GameJam" },
    year: "2026",
  },
];

export const blogPosts = [
  {
    date: "2024-11",
    title: { tr: "Modern Web Animasyonları", en: "Modern Web Animations" },
    excerpt: {
      tr: "Framer Motion ile performanslı animasyon ipuçları.",
      en: "Performance tips for animations with Framer Motion.",
    },
  },
  {
    date: "2024-09",
    title: { tr: "React Best Practices", en: "React Best Practices" },
    excerpt: {
      tr: "Bileşen yapısı ve state yönetimi üzerine notlar.",
      en: "Notes on component structure and state management.",
    },
  },
];

export const profileEmail = "baran.baran1433@gmail.com";

export const sideSocialLinks = [
  { name: "GitHub", url: "https://github.com/Baran1433", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/baran-uçar-7548952a8/", icon: "linkedin" },
  { name: "Instagram", url: "https://www.instagram.com/baran_ucar47/", icon: "instagram" },
];

export const socialLinks = [
  ...sideSocialLinks,
  { name: "Email", url: `mailto:${profileEmail}`, icon: "mail" },
];
