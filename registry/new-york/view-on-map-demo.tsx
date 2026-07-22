"use client";

import { ViewOnMap } from "./view-on-map";

export const ViewOnMapPreview = () => (
  <div className="flex min-h-96 w-full items-center justify-center">
    <ViewOnMap
      address="Marine Lines"
      mapImageUrl="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop"
    />
  </div>
);
