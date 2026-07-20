"use client";

import { Link01, Link02, Link03, Link04, Link05 } from "./link";

export const LinkDemo = () => (
  <div className="flex flex-col items-start gap-4">
    <Link01 href="https://prsui.pr5.dev" className="pl-2">
      left to right
    </Link01>
    <Link02 href="https://prsui.pr5.dev" className="pl-2">
      right to left
    </Link02>
    <Link03 href="https://prsui.pr5.dev" className="pl-2">
      center out
    </Link03>
    <Link04 href="https://prsui.pr5.dev">mix-blend highlight</Link04>
    <Link05 href="https://prsui.pr5.dev">mix-blend wipe</Link05>
  </div>
);
