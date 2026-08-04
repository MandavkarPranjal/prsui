"use client";

import type { Variants } from "motion/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import { useEffect, useState } from "react";

import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  words: string[];
  interval?: number;
  pauseOnHover?: boolean;
  as?: ElementType;
  className?: string;
}

const morphVariants: Variants = {
  animate: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_OUT },
    y: 0,
  },
  exit: {
    filter: "blur(6px)",
    opacity: 0,
    transition: { duration: 0.18, ease: EASE_OUT },
    y: -10,
  },
  initial: { filter: "blur(6px)", opacity: 0, y: 10 },
};

const reducedVariants: Variants = {
  animate: {
    opacity: 1,
    transition: { duration: 0.15, ease: EASE_OUT },
  },
  exit: { opacity: 0, transition: { duration: 0.1, ease: EASE_OUT } },
  initial: { opacity: 0 },
};

const MorphingText = ({
  words,
  interval = 3000,
  pauseOnHover = false,
  as: Tag = "div",
  className,
  ...props
}: MorphingTextProps & React.HTMLAttributes<HTMLElement>) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || words.length <= 1) {
      return;
    }

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(id);
  }, [interval, paused, words.length]);

  return (
    <Tag
      className={cn("inline-flex overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          variants={reduce ? reducedVariants : morphVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </Tag>
  );
};

export default MorphingText;
