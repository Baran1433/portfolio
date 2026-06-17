import { motion } from "framer-motion";

import { Github, Instagram, Linkedin, Mail } from "lucide-react";

import { lazy, Suspense, useState } from "react";

import { useLanguage } from "../../context/LanguageContext";

import { socialLinks } from "../../data/content";

import { useReducedMotion } from "../../hooks/useReducedMotion";

import { AnimatedInput } from "../ui/AnimatedInput";

import { PremiumButton } from "../ui/PremiumButton";

import { SectionReveal } from "../ui/SectionReveal";



const ModelCanvas = lazy(() => import("../ModelCanvas"));



const iconMap = { github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail };



function ModelFallback() {

  return (

    <div className="contact-model contact-model--loading" aria-hidden>

      <div className="model-loader-panel model-loader-panel--static">

        <div className="model-loader-ring" />

        <p className="model-loader-text">3D model</p>

      </div>

    </div>

  );

}



export function Contact() {

  const { t } = useLanguage();

  const reducedMotion = useReducedMotion();

  const [status, setStatus] = useState("idle");



  const handleSubmit = (e) => {

    e.preventDefault();

    setStatus("sending");

    setTimeout(() => setStatus("success"), 800);

  };



  return (

    <section id="contact" className="contact-section section-snap section-tone-4">

      <div className="contact-content">

        <SectionReveal>

          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text-main)] sm:text-4xl">

            {t("contact.title")}

          </h2>

          <p className="mt-3 text-base text-[var(--text-muted)]">{t("contact.subtitle")}</p>

        </SectionReveal>



        <SectionReveal delay={0.1}>

          <form onSubmit={handleSubmit} className="contact-form mt-10 space-y-4">

            <AnimatedInput type="text" name="name" required placeholder={t("contact.name")} />

            <AnimatedInput type="email" name="email" required placeholder={t("contact.email")} />

            <AnimatedInput type="text" name="subject" required placeholder={t("contact.subject")} />

            <AnimatedInput

              as="textarea"

              name="message"

              required

              rows={5}

              placeholder={t("contact.message")}

              className="resize-none"

            />

            <PremiumButton

              type="submit"

              variant="primary"

              disabled={status === "sending"}

              className="contact-submit-btn w-full disabled:opacity-70"

            >

              {status === "sending"

                ? t("contact.sending")

                : status === "success"

                  ? t("contact.success")

                  : t("contact.send")}

            </PremiumButton>

          </form>



          <div className="social-icons mt-10 flex flex-wrap gap-4">

            {socialLinks.map((link) => {

              const Icon = iconMap[link.icon];

              return (

                <motion.a

                  key={link.name}

                  href={link.url}

                  target="_blank"

                  rel="noopener noreferrer"

                  aria-label={link.name}

                  whileHover={{

                    scale: 1.08,

                    y: -3,

                    boxShadow: "0 0 24px rgba(124, 58, 237, 0.45)",

                  }}

                  transition={{ ease: [0.22, 1, 0.36, 1] }}

                  className="flex h-12 w-12 items-center justify-center rounded-full"

                >

                  <Icon size={20} />

                </motion.a>

              );

            })}

          </div>

        </SectionReveal>

      </div>



      <div className="contact-model">

        <SectionReveal delay={0.12} className="h-full w-full">

          {reducedMotion ? (

            <ModelFallback />

          ) : (

            <Suspense fallback={<ModelFallback />}>

              <ModelCanvas />

            </Suspense>

          )}

        </SectionReveal>

      </div>

    </section>

  );

}

