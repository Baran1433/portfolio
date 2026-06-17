import { motion } from "framer-motion";

import { profileEmail } from "../../data/content";



const EASE = [0.22, 1, 0.36, 1];



const container = {

  hidden: { opacity: 0, x: 28 },

  visible: {

    opacity: 1,

    x: 0,

    transition: { delay: 0.85, duration: 0.7, ease: EASE },

  },

};



export function SideEmail() {

  return (

    <motion.aside

      variants={container}

      initial="hidden"

      animate="visible"

      aria-label="E-posta"

      className="fixed bottom-0 right-5 z-40 hidden flex-col items-center pb-10 lg:right-10 lg:flex xl:right-12"

    >

      <motion.a

        href={`mailto:${profileEmail}`}

        whileHover={{ opacity: 1, scale: 1.02 }}

        transition={{ duration: 0.3, ease: EASE }}

        className="mb-6 max-h-[220px] truncate px-1 font-mono text-[12px] font-medium tracking-[0.28em] text-[var(--text-muted)] opacity-80 transition-all duration-300 hover:text-[var(--primary-cyan)] hover:opacity-100 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.45)] sm:text-[13px]"

        style={{ writingMode: "vertical-rl" }}

      >

        {profileEmail}

      </motion.a>

      <div className="premium-line h-44" aria-hidden />

    </motion.aside>

  );

}

