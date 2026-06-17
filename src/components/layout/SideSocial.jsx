import { motion } from "framer-motion";

import { Github, Instagram, Linkedin } from "lucide-react";

import { sideSocialLinks } from "../../data/content";



const iconMap = {

  github: Github,

  linkedin: Linkedin,

  instagram: Instagram,

};



const EASE = [0.22, 1, 0.36, 1];



const container = {

  hidden: { opacity: 0, x: -28 },

  visible: {

    opacity: 1,

    x: 0,

    transition: {

      delay: 0.85,

      duration: 0.7,

      ease: EASE,

      staggerChildren: 0.09,

      delayChildren: 0.95,

    },

  },

};



const item = {

  hidden: { opacity: 0, x: -14 },

  visible: {

    opacity: 0.85,

    x: 0,

    transition: { duration: 0.5, ease: EASE },

  },

};



export function SideSocial() {

  return (

    <motion.aside

      variants={container}

      initial="hidden"

      animate="visible"

      aria-label="Sosyal medya bağlantıları"

      className="fixed bottom-0 left-5 z-40 hidden flex-col items-center pb-10 lg:left-10 lg:flex xl:left-12"

    >

      <ul className="mb-6 flex flex-col items-center gap-6">

        {sideSocialLinks.map((link) => {

          const Icon = iconMap[link.icon];

          return (

            <motion.li key={link.name} variants={item}>

              <motion.a

                href={link.url}

                target="_blank"

                rel="noopener noreferrer"

                aria-label={link.name}

                whileHover={{

                  y: -3,

                  scale: 1.08,

                  opacity: 1,

                }}

                transition={{ type: "spring", stiffness: 420, damping: 24 }}

                className="group flex text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--primary-cyan)]"

              >

                <Icon

                  size={22}

                  strokeWidth={1.75}

                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.65)]"

                />

              </motion.a>

            </motion.li>

          );

        })}

      </ul>

      <motion.div variants={item} className="premium-line h-44" aria-hidden />

    </motion.aside>

  );

}

