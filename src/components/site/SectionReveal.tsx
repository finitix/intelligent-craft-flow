import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function SectionReveal({
  id,
  eyebrow,
  title,
  children,
}: PropsWithChildren<{ id: string; eyebrow: string; title: string }>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className="scroll-mt-24 py-16"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="mb-10">
        <p className="font-mono text-xs text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      </header>
      {children}
    </motion.section>
  );
}
