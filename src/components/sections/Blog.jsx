import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { blogPosts } from "../../data/content";
import { SectionShell } from "../ui/SectionShell";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerContainer, StaggerItem } from "../ui/SectionReveal";
import { SectionHeading } from "./SectionHeading";

export function Blog() {
  const { lang, t } = useLanguage();

  return (
    <SectionShell id="blog" variant={3}>
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <SectionHeading title={t("blog.title")} subtitle={t("blog.subtitle")} />
        </SectionReveal>

        <StaggerContainer className="grid gap-5 md:grid-cols-2">
          {blogPosts.map((post, i) => (
            <StaggerItem key={i}>
              <motion.article
                whileHover={{ y: -4 }}
                className="content-card rounded-2xl p-6 transition-shadow hover:border-accent/20 hover:shadow-soft"
              >
                <time className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {post.date}
                </time>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-800">
                  {post.title[lang]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{post.excerpt[lang]}</p>
                <button
                  type="button"
                  className="mt-4 text-sm font-semibold text-accent hover:underline"
                >
                  {t("blog.readMore")} →
                </button>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionShell>
  );
}
