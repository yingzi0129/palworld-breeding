"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Pal } from "@/lib/types";
import { getPalImageUrl } from "@/lib/data-client";

interface PalPickerProps {
  pals: Pal[];
  selected: Pal | null;
  onSelect: (pal: Pal | null) => void;
  label?: string;
  placeholder?: string;
}

export function PalPicker({
  pals,
  selected,
  onSelect,
  label,
  placeholder = "Search for a Pal...",
}: PalPickerProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pals.slice(0, 30);
    return pals
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.internalName.toLowerCase().includes(q) ||
          String(p.number).includes(q)
      )
      .slice(0, 20);
  }, [pals, query]);

  useEffect(() => {
    setHighlightIndex(0);
    itemRefs.current = filtered.map(() => null);
  }, [filtered]);

  useEffect(() => {
    if (open && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex, open]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (selected) onSelect(null);
      setOpen(true);
    },
    [selected, onSelect]
  );

  const selectPal = useCallback(
    (pal: Pal) => {
      onSelect(pal);
      setOpen(false);
      setQuery("");
      setHighlightIndex(0);
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
          setOpen(true);
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((i) => (i + 1) % filtered.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((i) => (i - 1 + filtered.length) % filtered.length);
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[highlightIndex]) {
            selectPal(filtered[highlightIndex]);
          }
          break;
        case "Escape":
          setOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [open, filtered, highlightIndex, selectPal]
  );

  const displayValue = selected ? selected.name : query;

  return (
    <div className="space-y-2 text-left" ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">{label}</label>
      )}

      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="pal-picker-list"
          aria-activedescendant={open ? `pal-option-${highlightIndex}` : undefined}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input pl-12 pr-10"
          autoComplete="off"
        />
        {selected ? (
          <button
            type="button"
            onClick={() => {
              onSelect(null);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-xs text-slate-500 hover:bg-slate-700 hover:text-slate-300"
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : (
          open && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-xs text-slate-500 hover:bg-slate-700 hover:text-slate-300"
              aria-label="Close suggestions"
            >
              ▲
            </button>
          )
        )}

        {open && (
          <div
            ref={listRef}
            id="pal-picker-list"
            className="absolute z-50 mt-2 max-h-80 w-full overflow-auto rounded-xl border border-slate-700 bg-slate-900 shadow-2xl scroll-hidden"
          >
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-500">No Pals found.</div>
            ) : (
              filtered.map((p, i) => {
                const highlighted = i === highlightIndex;
                return (
                  <button
                    key={p.internalName}
                    id={`pal-option-${i}`}
                    ref={(el: HTMLButtonElement | null) => { itemRefs.current[i] = el; }}
                    type="button"
                    onClick={() => selectPal(p)}
                    onMouseEnter={() => setHighlightIndex(i)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                      highlighted ? "bg-slate-700" : "hover:bg-slate-800"
                    }`}
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                      <Image
                        src={getPalImageUrl(p)}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-slate-200">{p.name}</div>
                      <div className="text-xs text-slate-500">
                        #{p.number} · {p.elements.join(", ")}
                      </div>
                    </div>
                    {highlighted && (
                      <span className="ml-auto text-xs text-slate-500">↵</span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PalPicker;
