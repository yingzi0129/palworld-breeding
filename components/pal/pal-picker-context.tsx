"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Pal } from "@/lib/types";
import { getPalImageUrl } from "@/lib/data-client";

interface PortalDropdownProps {
  anchor: DOMRect;
  items: Pal[];
  highlightIndex: number;
  onSelect: (pal: Pal) => void;
  onHighlight: (i: number) => void;
  onClose: () => void;
  noResults: boolean;
}

interface PalPickerPortalContextValue {
  mount: (props: PortalDropdownProps) => void;
  unmount: () => void;
  activeKey: string | null;
  setActiveKey: (key: string | null) => void;
}

const PalPickerPortalContext = createContext<PalPickerPortalContextValue | null>(null);

export function PalPickerPortalProvider({ children }: { children: ReactNode }) {
  const [portal, setPortal] = useState<PortalDropdownProps | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const mount = useCallback((props: PortalDropdownProps) => setPortal(props), []);
  const unmount = useCallback(() => setPortal(null), []);

  return (
    <PalPickerPortalContext.Provider value={{ mount, unmount, activeKey, setActiveKey }}>
      {children}
      {portal && createPortal(
        <PortalDropdown {...portal} />,
        document.body
      )}
    </PalPickerPortalContext.Provider>
  );
}

export function usePalPickerPortal() {
  const ctx = useContext(PalPickerPortalContext);
  if (!ctx) throw new Error("usePalPickerPortal must be used within PalPickerPortalProvider");
  return ctx;
}

function PortalDropdown({
  anchor,
  items,
  highlightIndex,
  onSelect,
  onHighlight,
  onClose,
  noResults,
}: PortalDropdownProps) {
  const [style, setStyle] = useState(() => getPosition(anchor, noResults));
  const anchorRef = useRef(anchor);
  anchorRef.current = anchor;

  useEffect(() => {
    function recalc() {
      setStyle(getPosition(anchorRef.current, items.length === 0 && noResults));
    }
    recalc();
    window.addEventListener("resize", recalc);
    window.addEventListener("scroll", recalc, true);
    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", recalc, true);
    };
  }, [anchor, items.length, noResults]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      const target = e.target as Node;
      const root = document.getElementById("pal-picker-portal-root");
      if (root && root.contains(target)) return;
      if (document.querySelector('[data-pal-picker]')?.contains(target)) return;
      onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  if (noResults) {
    return (
      <div
        id="pal-picker-portal-root"
        className="pal-picker-dropdown scroll-thin fixed rounded-xl border border-slate-700 bg-slate-900 shadow-2xl px-5 py-4 text-sm text-slate-500 z-[9999]"
        style={style}
      >
        No Pals found.
      </div>
    );
  }

  return (
    <div
      id="pal-picker-portal-root"
      className="pal-picker-dropdown scroll-thin fixed rounded-xl border border-slate-700 bg-slate-900 shadow-2xl z-[9999]"
      style={style}
    >
      {items.map((p, i) => {
        const highlighted = i === highlightIndex;
        return (
          <button
            key={p.internalName}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(p)}
            onMouseEnter={() => onHighlight(i)}
            data-highlighted={highlighted}
            className="pal-picker-option"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-800">
              <img
                src={getPalImageUrl(p)}
                alt={p.name}
                className="object-contain p-1.5 w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="pal-picker-option-name truncate text-lg font-semibold text-slate-200">{p.name}</div>
              <div className="text-sm text-slate-500">
                #{p.number} · {p.elements.join(", ")}
              </div>
            </div>
            {highlighted && <span className="text-sm text-slate-500">↵</span>}
          </button>
        );
      })}
    </div>
  );
}

function getPosition(anchor: DOMRect, isEmpty: boolean) {
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const padding = 16;
  const itemHeight = 68;
  const minVisibleRows = 4;
  const maxVisibleRows = 7;

  const spaceBelow = viewportH - anchor.bottom - padding;
  const spaceAbove = anchor.top - padding;

  let rowCount = maxVisibleRows;
  if (spaceBelow < maxVisibleRows * itemHeight) {
    if (spaceAbove >= maxVisibleRows * itemHeight) {
      rowCount = maxVisibleRows;
    } else {
      rowCount = Math.max(minVisibleRows, Math.min(maxVisibleRows, Math.floor(spaceBelow / itemHeight)));
    }
  }

  const dropdownHeight = isEmpty ? 80 : rowCount * itemHeight + 8;

  const width = Math.min(480, Math.max(360, anchor.width));
  let left = anchor.left;
  if (left + width + padding > viewportW) {
    left = Math.max(padding, viewportW - width - padding);
  }

  let top = anchor.bottom + 8;

  if (spaceBelow < dropdownHeight) {
    if (spaceAbove >= dropdownHeight) {
      top = Math.max(padding, anchor.top - dropdownHeight - 8);
    } else {
      top = Math.min(top, viewportH - dropdownHeight - padding);
    }
  }

  top = Math.max(padding, top);

  return {
    left,
    top,
    width,
    maxHeight: dropdownHeight,
    minHeight: isEmpty ? 64 : rowCount * itemHeight,
  };
}

export default PalPickerPortalProvider;
