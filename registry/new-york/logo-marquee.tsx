"use client";

import { useMotionValue, animate, motion } from "motion/react";
import React, { memo, useState, useEffect } from "react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

export interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const controls = isTransitioning
      ? animate(translation, [translation.get(), to], {
          duration:
            currentDuration * Math.abs((translation.get() - to) / contentSize),
          ease: "linear",
          onComplete: () => {
            setIsTransitioning(false);
            setKey((prev) => prev + 1);
          },
        })
      : animate(translation, [from, to], {
          duration: currentDuration,
          ease: "linear",
          onRepeat: () => translation.set(from),
          repeat: Infinity,
          repeatDelay: 0,
          repeatType: "loop",
        });

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          flexDirection: direction === "horizontal" ? "row" : "column",
          gap: `${gap}px`,
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- User explicitly chose <img> over next/image
    <img
      alt={logo.alt}
      src={logo.src}
      width={logo.width ?? "auto"}
      height={logo.height ?? "auto"}
      loading="lazy"
      className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
    />
  );
});

export const LogoMarquee = memo(function LogoMarquee({
  logos,
  className,
}: {
  logos: Logo[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {[...logos, ...logos].map((logo, i) => (
          <LogoImage key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";

export default LogoMarquee;
