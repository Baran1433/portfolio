import { Github, Instagram, Linkedin } from "lucide-react";
import { profileEmail, sideSocialLinks } from "../../data/content";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

/** Mobilde yan alanlar gizlenince iletişim bölümü üstünde gösterilir */
export function MobileSideLinks() {
  return (
    <div className="relative flex flex-col items-center gap-6 section-surface bg-section-3 px-6 py-10 lg:hidden">
      <div className="flex items-center gap-6">
        {sideSocialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-slate-400 transition-all hover:-translate-y-0.5 hover:text-accent hover:drop-shadow-[0_0_10px_rgba(79,124,255,0.5)]"
            >
              <Icon size={22} strokeWidth={1.75} />
            </a>
          );
        })}
      </div>
      <a
        href={`mailto:${profileEmail}`}
        className="font-mono text-xs tracking-wide text-slate-500 transition-colors hover:text-accent"
      >
        {profileEmail}
      </a>
    </div>
  );
}
