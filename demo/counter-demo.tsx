"use client";

import Counter from "@/registry/new-york/counter";

const metrics = [
  { label: "Components shipped", prefix: "", suffix: "", value: 12_800 },
  { decimals: 1, label: "Uptime", suffix: "%", value: 99.9 },
  { decimals: 1, label: "Average rating", suffix: "/5", value: 4.8 },
  { label: "Funds raised", prefix: "$", value: 240_000 },
];

export const CounterPreview = () => (
  <div className="grid w-full max-w-2xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
    {metrics.map((metric) => (
      <div
        key={metric.label}
        className="flex flex-col items-center gap-2 text-center"
      >
        <p className="text-4xl font-medium tracking-tight text-foreground">
          <Counter
            value={metric.value}
            prefix={metric.prefix}
            suffix={metric.suffix}
            decimals={metric.decimals}
            duration={2}
          />
        </p>
        <p className="text-sm text-muted-foreground">{metric.label}</p>
      </div>
    ))}
  </div>
);
