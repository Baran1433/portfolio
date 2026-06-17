import { motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useSmoothScroll } from "../../providers/SmoothScrollProvider";

export function CertificateModal({ certificate, lang, onClose }) {
  const isImage = certificate?.type === "image";
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (!certificate) return;

    // Pause smooth scrolling if initialized
    if (lenis) {
      lenis.stop();
    }
    // Block standard body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Resume scroll on close
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = originalOverflow;
    };
  }, [certificate, lenis]);

  if (!certificate) return null;

  return createPortal(
    <motion.div
      key="cert-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 md:p-8 cursor-zoom-out"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      data-lenis-prevent
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 z-[100000] rounded-full bg-black/60 border border-white/10 p-3 text-white transition hover:bg-black hover:scale-110"
        aria-label="Close preview"
      >
        <X size={24} />
      </button>

      {/* Centered Image/Iframe container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-center max-w-[92vw] max-h-[88vh]"
        onClick={(event) => event.stopPropagation()}
      >
        {isImage ? (
          <img
            src={certificate.image}
            alt={certificate.title[lang]}
            className="max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <iframe
            src={certificate.image}
            title={certificate.title[lang]}
            className="w-[85vw] h-[85vh] max-w-[92vw] max-h-[88vh] rounded-lg border-0 shadow-2xl"
          />
        )}
      </motion.div>

      {/* Floating caption at bottom */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center bg-slate-950/70 border border-white/10 backdrop-blur-md px-6 py-3 rounded-2xl max-w-[90vw]"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="text-white font-semibold text-base sm:text-lg">
          {certificate.title[lang]}
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
          {certificate.issuer[lang]} &bull; {certificate.year}
        </p>
      </div>
    </motion.div>,
    document.body
  );
}
