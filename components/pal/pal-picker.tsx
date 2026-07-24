"use client";

import { useState, useMemo, useRef, useEffect, useCallback, useLayoutEffect } from "react";
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
  const justSelectedRef = useRef(false);
  const [dropdownStyle, setDropdownStyle] = useState<{ left: number; top: number; width: number; maxHeight: number }>({ left: 0, top: 0, width: 0, maxHeight: 384 });

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

  const updateDropdownPosition = useCallback(() => {
    if (!containerRef.current || !open) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const listMaxHeight = 384; // max-h-96
    const spaceBelow = viewportHeight - rect.bottom;
    const padding = 8;
    let top = rect.bottom + padding;
    let maxHeight = listMaxHeight;
    if (spaceBelow < listMaxHeight + padding) {
      const spaceAbove = rect.top - padding;
      if (spaceAbove >= listMaxHeight + padding) {
        top = Math.max(padding, rect.top - listMaxHeight - padding);
      } else if (spaceAbove > spaceBelow) {
        maxHeight = Math.max(120, spaceAbove - padding);
        top = Math.max(padding, rect.top - maxHeight - padding);
      } else {
        maxHeight = Math.max(120, spaceBelow - padding);
      }
    }
    setDropdownStyle({ left: rect.left, top, width: rect.width, maxHeight });
  }, [open]);

  useLayoutEffect(() => {
    updateDropdownPosition();
  }, [open, updateDropdownPosition]);

  useEffect(() => {
    function handleResize() {
      updateDropdownPosition();
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
  }, [updateDropdownPosition]);

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
      justSelectedRef.current = true;
      onSelect(pal);
      setOpen(false);
      setQuery("");
      setHighlightIndex(0);
      setTimeout(() => {
        justSelectedRef.current = false;
      }, 200);
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

  const handleInputFocus = useCallback(() => {
    if (justSelectedRef.current) return;
    setOpen(true);
  }, []);

  const handleInputMouseDown = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const displayValue = selected ? selected.name : query;

  return (
    <div className="space-y-2 text-left" ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">{label}</label>
      )}

      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
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
          onFocus={handleInputFocus}
          onMouseDown={handleInputMouseDown}
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
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-xs text-slate-500 hover:bg-slate-700 hover:text-slate-300"
            aria-label="Toggle suggestions"
            aria-expanded={open}
          >
            {open ? "▲" : "▼"}
          </button>
        )}

        {open && (
          <div
            ref={listRef}
            id="pal-picker-list"
            className="suggestion-list scroll-hidden"
            style={{
              position: "fixed",
              left: dropdownStyle.left,
              top: dropdownStyle.top,
              width: dropdownStyle.width,
              maxWidth: dropdownStyle.width,
              maxHeight: dropdownStyle.maxHeight,
            }}
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
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectPal(p)}
                    onMouseEnter={() => setHighlightIndex(i)}
                    data-highlighted={highlighted}
                    className="suggestion-item"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                      <Image
                        src={getPalImageUrl(p)}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="suggestion-item-name truncate text-base font-medium text-slate-200">{p.name}</div>
                      <div className="text-sm text-slate-500">
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
