"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

import { SPRING_MOUSE } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer distance the element travels toward the cursor (0-1). Default 0.35. */
  strength?: number;
  /** Maximum travel distance in px from the rest position. Default 32. */
  maxOffset?: number;
  /** Scale applied while the pointer is inside the element. Default 1.04. */
  hoverScale?: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const Magnetic = ({
  children,
  className,
  strength = 0.35,
  maxOffset = 32,
  hoverScale = 1.04,
}: MagneticProps) => {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, SPRING_MOUSE);
  const y = useSpring(offsetY, SPRING_MOUSE);
  const scale = useSpring(1, { damping: 22, mass: 0.4, stiffness: 320 });

  const pull = (event: PointerEvent<HTMLDivElement>) => {
    if (!canHover || reduce) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    offsetX.set(clamp(dx * strength, -maxOffset, maxOffset));
    offsetY.set(clamp(dy * strength, -maxOffset, maxOffset));
  };

  const release = () => {
    offsetX.set(0);
    offsetY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      className={cn("inline-block", className)}
      style={{ scale, x, y }}
      onPointerEnter={() => {
        if (!canHover || reduce) {
          return;
        }
        scale.set(hoverScale);
      }}
      onPointerMove={pull}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
