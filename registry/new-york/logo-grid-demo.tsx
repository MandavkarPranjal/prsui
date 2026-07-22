"use client";

import { LogoGrid } from "./logo-grid";
import type { Logo } from "./logo-grid";

const logos: Logo[] = [
  { alt: "Nvidia", src: "https://svgl.app/library/nvidia-wordmark-light.svg" },
  {
    alt: "Supabase",
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
  },
  { alt: "OpenAI", src: "https://svgl.app/library/openai_wordmark_light.svg" },
  { alt: "Vercel", src: "https://svgl.app/library/vercel_wordmark.svg" },
  { alt: "GitHub", src: "https://svgl.app/library/github_wordmark_light.svg" },
  { alt: "Clerk", src: "https://svgl.app/library/clerk-wordmark-light.svg" },
  { alt: "Turso", src: "https://svgl.app/library/turso-wordmark-light.svg" },
  {
    alt: "Claude",
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
  },
];

export const LogoGridPreview = function LogoGridPreview() {
  return (
    <div className="p-2 w-full">
      <LogoGrid logos={logos} />
    </div>
  );
};
