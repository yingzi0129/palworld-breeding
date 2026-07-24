"use client";

import { useState } from "react";

interface TabsProps {
  labels: string[];
  children: React.ReactNode[];
}

export function Tabs({ labels, children }: TabsProps) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="grid border-b border-slate-700/50 md:grid-cols-2">
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`px-6 py-4 text-center text-sm font-bold transition ${
              active === i
                ? "bg-slate-800/50 text-red-500 border-b-2 border-red-500"
                : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-6 md:p-10">{children[active]}</div>
    </div>
  );
}
