"use client";

import { motion } from "motion/react";

export function AnimatedHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-6 text-center"
    >
      <h1 className="text-5xl font-semibold tracking-tight text-black dark:text-zinc-50">
        TechFlow
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        The redesign starts here.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-12 rounded-full bg-foreground px-6 font-medium text-background"
      >
        Get started
      </motion.button>
    </motion.section>
  );
}
