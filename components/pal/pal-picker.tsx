"use client";

import { useState, useMemo, useRef, useEffect, useCallback, forwardRef, useImperativeHandle, useId } from "react";
import type { Pal } from "@/lib/types";
import { usePalPickerPortal } from "./pal-picker-context";

interface PalPickerProps {
  pals: Pal[];
  selected: Pal | null;
  onSelect: (pal: Pal | null) => void;
  label?: string;
  placeholder?: string;
}

export interface PalPickerHandle {
  close: () => void;
}

export const PalPicker = forwardRef<PalPickerHandle, PalPickerProps>(function PalPicker(
  { pals, selected, onSelect, label, placeholder = "Search for a Pal..." },
  ref
) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const justSelectedRef = useRef(false);
  const pickerId = useId();
  const { mount, unmount, activeKey, setActiveKey } = usePalPickerPortal();

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

  const updatePortal = useCallback(() => {
    if (!open || !containerRef.current) {
      unmount();
      return;
    }
    const anchor = containerRef.current.getBoundingClientRect();
    mount({
      anchor,
      items: filtered.slice(0, 20),
      highlightIndex,
      onSelect: (pal) => {
        justSelectedRef.current = true;
        onSelect(pal);
        setOpen(false);
        setActiveKey(null);
        setQuery("");
        setHighlightIndex(0);
        setTimeout(() => {
          justSelectedRef.current = false;
        }, 200);
      },
      onHighlight: (i) => setHighlightIndex(i),
      onClose: () => {
        setOpen(false);
        setActiveKey(null);
        inputRef.current?.blur();
      },
      noResults: filtered.length === 0,
    });
  }, [open, filtered, highlightIndex, mount, unmount, onSelect, setActiveKey]);

  useEffect(() => {
    updatePortal();
    if (!open) unmount();
  }, [open, updatePortal, unmount]);

  useEffect(() => {
    if (!open) return;
    updatePortal();
  }, [filtered, highlightIndex, open, updatePortal]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [filtered]);

  useImperativeHandle(ref, () => ({
    close: () => {
      setOpen(false);
      setActiveKey(null);
    },
  }));

  useEffect(() => {
    if (activeKey && activeKey !== pickerId && open) {
      setOpen(false);
    }
  }, [activeKey, pickerId, open]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (selected) onSelect(null);
      setOpen(true);
      setActiveKey(pickerId);
    },
    [selected, onSelect, pickerId, setActiveKey]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
          setOpen(true);
          setActiveKey(pickerId);
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
            const pal = filtered[highlightIndex];
            justSelectedRef.current = true;
            onSelect(pal);
            setOpen(false);
            setActiveKey(null);
            setQuery("");
            setHighlightIndex(0);
            setTimeout(() => {
              justSelectedRef.current = false;
            }, 200);
          }
          break;
        case "Escape":
          setOpen(false);
          setActiveKey(null);
          inputRef.current?.blur();
          break;
      }
    },
    [open, filtered, highlightIndex, onSelect, pickerId, setActiveKey]
  );

  const handleInputFocus = useCallback(() => {
    if (justSelectedRef.current) return;
    setOpen(true);
    setActiveKey(pickerId);
  }, [pickerId, setActiveKey]);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => {
      const next = !prev;
      setActiveKey(next ? pickerId : null);
      return next;
    });
    if (!open) inputRef.current?.focus();
  }, [open, pickerId, setActiveKey]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(null);
    inputRef.current?.focus();
  }, [onSelect]);

  const displayValue = selected ? selected.name : query;

  return (
    <div className="relative space-y-2 text-left" ref={containerRef} data-pal-picker={pickerId}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">{label}</label>
      )}

      <div
        className="relative"
        onClick={(e) => {
          const target = e.target as Node;
          const inputEl = inputRef.current;
          const buttonEls = inputEl?.parentElement?.querySelectorAll('button');
          let isButton = false;
          buttonEls?.forEach((b) => { if (b.contains(target)) isButton = true; });
          if (!isButton) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (!open || activeKey !== pickerId) {
              setOpen(true);
              setActiveKey(pickerId);
            }
            inputRef.current?.focus();
          }
        }}
      >
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
          aria-controls="pal-picker-portal-root"
          aria-activedescendant={open ? `pal-option-${highlightIndex}` : undefined}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={(e) => {
            e.stopPropagation();
            handleInputFocus();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input pl-12 pr-10"
          autoComplete="off"
        />
        {selected ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-xs text-slate-500 hover:bg-slate-700 hover:text-slate-300"
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : (
          <button
            type="button"
            onClick={handleToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-xs text-slate-500 hover:bg-slate-700 hover:text-slate-300"
            aria-label="Toggle suggestions"
            aria-expanded={open}
          >
            {open ? "▲" : "▼"}
          </button>
        )}
      </div>
    </div>
  );
});

export default PalPicker;
