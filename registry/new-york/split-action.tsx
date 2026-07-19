"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Action {
  icon: LucideIcon;
  label: string;
}

interface SplitActionsProps {
  actions: Action[];
  triggerIcon?: LucideIcon;
}

const SplitActions = ({
  actions,
  triggerIcon: TriggerIcon = Plus,
}: SplitActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [positions, setPositions] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const GAP = 8;

    const calculatePositions = () => {
      const widths = buttonRefs.current.map(
        (button) => button?.offsetWidth ?? 0
      );

      const totalWidth =
        widths.reduce((sum, width) => sum + width, 0) +
        GAP * (widths.length - 1);

      let cursor = -totalWidth / 2;

      const newPositions = widths.map((width) => {
        const center = cursor + width / 2;
        cursor += width + GAP;
        return center;
      });

      setPositions(newPositions);
    };

    requestAnimationFrame(calculatePositions);

    window.addEventListener("resize", calculatePositions);

    return () => {
      window.removeEventListener("resize", calculatePositions);
    };
  }, [actions, isOpen]);

  return (
    <div className="flex items-center justify-center py-8">
      <button
        type="button"
        className="relative flex min-h-14 min-w-14 items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.button
              key="trigger"
              whileTap={{ scale: 1.15 }}
              initial={{
                filter: "blur(8px)",
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                filter: "blur(0px)",
                opacity: 1,
                scale: 1,
              }}
              exit={{
                filter: "blur(8px)",
                opacity: 0,
                scale: 0.5,
              }}
              transition={{
                damping: 24,
                stiffness: 220,
                type: "spring",
              }}
              className="rounded-full bg-black p-2 text-white dark:bg-white dark:text-black"
            >
              <TriggerIcon className="size-8 stroke-3" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen &&
            actions.map((action, index) => (
              <motion.button
                key={action.label}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                initial={{
                  filter: "blur(8px)",
                  opacity: 0,
                  scale: 0,
                  x: 0,
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  scale: 1,
                  x: positions[index] ?? 0,
                }}
                exit={{
                  filter: "blur(8px)",
                  opacity: 0,
                  scale: 0.5,
                  x: 0,
                }}
                transition={{
                  damping: 24,
                  stiffness: 220,
                  type: "spring",
                }}
                className={cn(
                  "absolute flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-zinc-900",
                  (positions[index] ?? 0) < 0 ? "origin-right" : "origin-left"
                )}
              >
                <action.icon className="size-4 stroke-2" />
                <span className="text-lg font-medium">{action.label}</span>
              </motion.button>
            ))}
        </AnimatePresence>
      </button>
    </div>
  );
};

export { SplitActions };
