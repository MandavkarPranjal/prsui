"use client";

import { EditableChip } from "@/registry/new-york/editable-chip";

export const EditableChipPreview = () => (
  <div className="flex min-h-96 w-full items-center justify-center">
    <EditableChip
      defaultLabel="Watchlist"
      onChange={(value) => console.log(value)}
    />
  </div>
);
