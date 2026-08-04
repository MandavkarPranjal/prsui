"use client";

import type { Transition, Variants } from "motion/react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const landingVariants: Variants = {
  idle: { scale: 1 },
  landed: { scale: [1, 1.02, 1] },
};

interface CounterProps {
  value: number;
  from?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimalSeparator?: string;
  transition?: Transition;
  trigger?: "inView" | "auto";
  className?: string;
  onComplete?: () => void;
}

const Counter = ({
  value,
  from = 0,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  decimalSeparator = ".",
  transition,
  trigger = "inView",
  className,
  onComplete,
  ...props
}: CounterProps & React.HTMLAttributes<HTMLSpanElement>) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);
  const [landed, setLanded] = useState(false);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    if (trigger === "inView" && !inView) {
      return;
    }

    if (reduce) {
      motionValue.set(value);
      onComplete?.();
      return;
    }

    const controls = animate(motionValue, value, {
      ...transition,
      delay,
      duration: transition?.duration ?? duration,
      ease: transition?.ease ?? EASE_OUT,
      onComplete: () => {
        setLanded(true);
        onComplete?.();
      },
    });

    return () => controls.stop();
  }, [
    value,
    from,
    duration,
    delay,
    inView,
    trigger,
    transition,
    motionValue,
    reduce,
    onComplete,
  ]);

  const formatValue = (num: number) => {
    const fixed = num.toFixed(decimals);
    const [int, dec] = fixed.split(".");
    const formattedInt = int.replaceAll(/\B(?=(\d{3})+(?!\d))/g, separator);
    return dec === undefined
      ? formattedInt
      : `${formattedInt}${decimalSeparator}${dec}`;
  };

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      <span className="sr-only">{`${prefix}${formatValue(value)}${suffix}`}</span>
      <motion.span
        aria-hidden="true"
        variants={landingVariants}
        initial="idle"
        animate={landed ? "landed" : "idle"}
        transition={{ duration: 0.3, ease: EASE_OUT }}
      >
        {prefix}
        {formatValue(displayValue)}
        {suffix}
      </motion.span>
    </span>
  );
};

export default Counter;
