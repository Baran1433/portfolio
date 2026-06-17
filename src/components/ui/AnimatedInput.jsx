import { motion } from "framer-motion";

import { useId, useState } from "react";

import { useReducedMotion } from "../../hooks/useReducedMotion";



export function AnimatedInput({

  as: Component = "input",

  label,

  className = "",

  ...props

}) {

  const id = useId();

  const [focused, setFocused] = useState(false);

  const reduced = useReducedMotion();



  const sharedClass =

    "premium-input peer w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 ease-premium";



  return (

    <div className="relative">

      {label && (

        <label

          htmlFor={id}

          className={`pointer-events-none absolute left-4 z-10 text-xs font-medium transition-all duration-300 ease-premium ${

            focused

              ? "-top-2.5 bg-[var(--bg-section)] px-1.5 text-[var(--purple)]"

              : "top-3.5 text-[var(--text-secondary)]"

          }`}

        >

          {label}

        </label>

      )}



      <Component

        id={id}

        className={`${sharedClass} ${focused ? "premium-input--focused" : ""} ${className}`}

        onFocus={() => setFocused(true)}

        onBlur={() => setFocused(false)}

        {...props}

      />



      {!reduced && (

        <motion.span

          aria-hidden

          className="pointer-events-none absolute inset-x-3 bottom-0 h-px origin-center rounded-full bg-gradient-to-r from-transparent via-[var(--purple)] to-transparent"

          initial={{ scaleX: 0, opacity: 0 }}

          animate={{

            scaleX: focused ? 1 : 0,

            opacity: focused ? 1 : 0,

          }}

          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}

        />

      )}

    </div>

  );

}

