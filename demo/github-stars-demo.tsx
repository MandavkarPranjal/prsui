"use client";

import { GitHubStars } from "@/registry/new-york/github-stars";

export const GitHubStarsDemo = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="flex flex-wrap items-center gap-4">
      <GitHubStars repo="vercel/next.js" size="sm" />
      <GitHubStars repo="vercel/next.js" size="default" />
      <GitHubStars repo="vercel/next.js" size="lg" />
    </div>
  </div>
);
