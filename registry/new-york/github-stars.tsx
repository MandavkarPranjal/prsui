"use client";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Tooltip } from "./tooltip";

const githubStarsVariants = cva(
  "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/60 bg-card/50 font-medium text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-border hover:bg-card",
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "h-9 px-3.5 text-sm",
        lg: "h-10 px-4 text-base",
        sm: "h-8 px-3 text-xs",
      },
    },
  }
);

interface GitHubStarsProps extends VariantProps<typeof githubStarsVariants> {
  repo: string;
  className?: string;
  locales?: Intl.LocalesArgument;
}

const getStarsCount = async (repo: string): Promise<number> => {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      return 0;
    }

    const data = (await res.json()) as { stargazers_count: number };
    return Number(data.stargazers_count);
  } catch {
    return 0;
  }
};

export const GitHubStars = ({
  repo,
  locales = "en-US",
  className,
  size,
}: GitHubStarsProps) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const result = await getStarsCount(repo);
      setCount(result);
    };
    fetchCount();
  }, [repo]);

  const formatted =
    count === null
      ? "—"
      : new Intl.NumberFormat(locales, {
          compactDisplay: "short",
          notation: "compact",
        })
          .format(count)
          .toLowerCase();

  const full =
    count === null ? "—" : new Intl.NumberFormat(locales).format(count);

  return (
    <Tooltip content={`${full} stars`}>
      <motion.a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(githubStarsVariants({ size }), className)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ damping: 17, stiffness: 400, type: "spring" }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
          className="text-foreground"
          initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{
            damping: 20,
            delay: 0.1,
            stiffness: 260,
            type: "spring",
          }}
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </motion.svg>
        <motion.span
          className="tabular-nums text-muted-foreground"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {formatted}
        </motion.span>
      </motion.a>
    </Tooltip>
  );
};

export default GitHubStars;
