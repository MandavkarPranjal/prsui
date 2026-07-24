"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";
import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface AccordionClassNames {
  root?: string;
  item?: string;
  trigger?: string;
  icon?: string;
  title?: string;
  chevron?: string;
  content?: string;
  description?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  collapsible?: boolean;
  className?: string;
  classNames?: AccordionClassNames;
}

// Local springs keep the accordion's connected groups moving together while
// avoiding scale projection on text-heavy row contents.
// Gap spring: must not overshoot y — positive y overshoot drifts items below
// their mt-3 resting point and briefly overlaps the next item.
const ROW_TRANSITION: Transition = {
  bounce: 0.18,
  duration: 0.45,
  type: "spring",
};

const CONTENT_OPEN_TRANSITION: Transition = {
  bounce: 0.16,
  duration: 0.46,
  type: "spring",
};

const CONTENT_CLOSE_TRANSITION: Transition = {
  bounce: 0.14,
  duration: 0.4,
  type: "spring",
};

const DESCRIPTION_TRANSITION: Transition = {
  duration: 0.22,
  ease: EASE_OUT,
};

const CHEVRON_TRANSITION: Transition = {
  bounce: 0.16,
  duration: 0.38,
  type: "spring",
};

const useControllableAccordionValue = function useControllableAccordionValue({
  value,
  defaultValue,
  onValueChange,
}: {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);
  const isControlled = value !== undefined;
  const currentValue = value ?? internalValue;

  const setValue = useCallback(
    (next: string | null) => {
      if (!isControlled) {
        setInternalValue(next);
      }

      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  return [currentValue, setValue] as const;
};

const getAnimateStyle = function getAnimateStyle(
  startsGroup: boolean,
  endsGroup: boolean
): {
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
} {
  return {
    borderBottomLeftRadius: endsGroup ? 28 : 0,
    borderBottomRightRadius: endsGroup ? 28 : 0,
    borderTopLeftRadius: startsGroup ? 28 : 0,
    borderTopRightRadius: startsGroup ? 28 : 0,
  };
};

const getTransition = function getTransition(
  reduce: boolean | null,
  open: boolean
): Transition {
  if (reduce) {
    return { duration: 0 };
  }
  return open ? CONTENT_OPEN_TRANSITION : CONTENT_CLOSE_TRANSITION;
};

const TriggerIcon = function TriggerIcon({
  icon,
  className,
}: {
  icon?: ReactNode;
  className?: string;
}) {
  if (!icon) {
    return null;
  }
  return (
    <span
      className={cn(
        "grid h-7 w-7 shrink-0 place-items-center text-muted-foreground",
        className
      )}
    >
      {icon}
    </span>
  );
};

const AccordionRow = function AccordionRow({
  item,
  open,
  startsGroup,
  endsGroup,
  separatedFromPrevious,
  contentId,
  triggerId,
  reduce,
  classNames,
  onToggle,
}: {
  item: AccordionItem;
  open: boolean;
  startsGroup: boolean;
  endsGroup: boolean;
  separatedFromPrevious: boolean;
  contentId: string;
  triggerId: string;
  reduce: boolean | null;
  classNames?: AccordionClassNames;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }

    const updateHeight = () => {
      setContentHeight(node.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      layout="position"
      initial={false}
      style={{ marginTop: separatedFromPrevious ? 12 : 0 }}
      transition={reduce ? { duration: 0 } : ROW_TRANSITION}
    >
      <motion.div
        data-state={open ? "open" : "closed"}
        initial={false}
        animate={getAnimateStyle(startsGroup, endsGroup)}
        transition={reduce ? { duration: 0 } : ROW_TRANSITION}
        className={cn(
          "overflow-hidden bg-card text-card-foreground",
          item.disabled && "opacity-50",
          classNames?.item
        )}
      >
        <button
          id={triggerId}
          type="button"
          disabled={item.disabled}
          aria-expanded={open}
          aria-controls={contentId}
          onClick={onToggle}
          className={cn(
            "flex min-h-[54px] w-full items-center gap-4 px-5 text-left outline-none transition-colors",
            "focus-visible:bg-muted/25",
            "disabled:pointer-events-none",
            classNames?.trigger
          )}
        >
          <TriggerIcon icon={item.icon} className={classNames?.icon} />
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-[15px] font-medium text-foreground",
              classNames?.title
            )}
          >
            {item.title}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduce ? { duration: 0 } : CHEVRON_TRANSITION}
            className={cn(
              "grid h-6 w-6 shrink-0 place-items-center text-muted-foreground",
              classNames?.chevron
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>

        <motion.div
          layout="size"
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          aria-hidden={!open}
          initial={false}
          style={{ height: open && item.description ? contentHeight : 0 }}
          transition={getTransition(reduce, open)}
          className={cn("overflow-hidden", classNames?.content)}
        >
          <motion.div
            ref={contentRef}
            animate={{
              opacity: open ? 1 : 0,
            }}
            transition={reduce ? { duration: 0 } : DESCRIPTION_TRANSITION}
            className="px-5 pb-5"
          >
            <div
              className={cn(
                "text-[15px] leading-6 text-muted-foreground",
                classNames?.description
              )}
            >
              {item.description}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Accordion = function Accordion({
  items,
  value,
  defaultValue = null,
  onValueChange,
  collapsible = true,
  className,
  classNames,
}: AccordionProps) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [activeValue, setActiveValue] = useControllableAccordionValue({
    defaultValue,
    onValueChange,
    value,
  });
  const activeIndex = items.findIndex((item) => item.id === activeValue);

  const toggleItem = useCallback(
    (id: string) => {
      if (activeValue === id) {
        if (collapsible) {
          setActiveValue(null);
        }
        return;
      }

      setActiveValue(id);
    },
    [activeValue, collapsible, setActiveValue]
  );

  return (
    <div className={cn("w-full", className, classNames?.root)}>
      {items.map((item, index) => {
        const open = activeValue === item.id;
        const previousIsOpen = activeIndex === index - 1;
        const nextIsOpen = activeIndex === index + 1;
        const startsGroup = open || index === 0 || previousIsOpen;
        const endsGroup = open || index === items.length - 1 || nextIsOpen;
        const separatedFromPrevious = index > 0 && (open || previousIsOpen);
        const contentId = `${baseId}-${item.id}-content`;
        const triggerId = `${baseId}-${item.id}-trigger`;

        return (
          <AccordionRow
            key={item.id}
            item={item}
            open={open}
            startsGroup={startsGroup}
            endsGroup={endsGroup}
            separatedFromPrevious={separatedFromPrevious}
            contentId={contentId}
            triggerId={triggerId}
            reduce={reduce}
            classNames={classNames}
            onToggle={() => toggleItem(item.id)}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
