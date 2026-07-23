"use client";

import { InlineToast } from "@/registry/new-york/inline-toast";

export const InlineToastPreview = () => (
  <div className="flex min-h-96 w-full items-center justify-center">
    <InlineToast code="CPT8456Y9" copyDuration={2000} />
  </div>
);
