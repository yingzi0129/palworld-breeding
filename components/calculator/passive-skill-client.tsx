"use client";

import { useState, useMemo } from "react";
import type { PassiveSkill } from "@/lib/types";

interface Props {
  passives: PassiveSkill[];
}

const SLOTS = 4;

export function PassiveSkillClient({ passives }: Props) {
  const [parentA, setParentA] = useState<(PassiveSkill | null)[]>([null, null, null, null]);
  const [parentB, setParentB] = useState<(PassiveSkill | null)[]>([null, null, null, null]);
  const [target, setTarget] = useState<PassiveSkill[]>([]);

  const parentSkills = useMemo(() => {
    const map = new Map<string, PassiveSkill>();
    [...parentA, ...parentB].forEach((s) => {
      if (s) map.set(s.internalName, s);
    });
    return Array.from(map.values());
  }, [parentA, parentB]);

  const uniqueTargetCount = useMemo(
    () => new Set(target.map((t) => t.internalName)).size,
    [target]
  );

  const probability = useMemo(() => {
    if (target.length === 0) return 0;
    const parentNames = new Set(parentSkills.map((s) => s.internalName));
    const possible = target.every((t) => parentNames.has(t.internalName));
    if (!possible) return 0;
    // Each inherited skill is independently chosen from parent skills with equal weight.
    // Probability that all target skills appear at least once across 4 child slots.
    const pool = parentSkills.length || 1;
    const targetNames = new Set(target.map((t) => t.internalName));
    let success = 0;
    const total = Math.pow(pool, SLOTS);
    const targetNamesArr = Array.from(targetNames);
    for (let mask = 0; mask < total; mask++) {
      const got = new Set<string>();
      let m = mask;
      for (let i = 0; i < SLOTS; i++) {
        got.add(parentSkills[m % pool].internalName);
        m = Math.floor(m / pool);
      }
      if (targetNamesArr.every((n) => got.has(n))) success++;
    }
    return success / total;
  }, [parentSkills, target]);

  function SkillSelector({
    label,
    selected,
    onChange,
  }: {
    label: string;
    selected: (PassiveSkill | null)[];
    onChange: (skills: (PassiveSkill | null)[]) => void;
  }) {
    return (
      <div>
        <div className="mb-2 text-sm font-medium text-slate-300">{label}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {selected.map((s, i) => (
            <select
              key={i}
              value={s?.internalName || ""}
              onChange={(e) => {
                const skill = passives.find((p) => p.internalName === e.target.value) || null;
                const next = [...selected];
                next[i] = skill;
                onChange(next);
              }}
              className="input"
            >
              <option value="">Empty slot {i + 1}</option>
              {passives.map((p) => (
                <option key={p.internalName} value={p.internalName}>
                  {p.name} ({p.rank})
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SkillSelector label="Parent A passive skills" selected={parentA} onChange={setParentA} />
      <SkillSelector label="Parent B passive skills" selected={parentB} onChange={setParentB} />

      <div>
        <div className="mb-2 text-sm font-medium text-slate-300">Target skills on child</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {Array.from({ length: SLOTS }).map((_, i) => (
            <select
              key={i}
              value={target[i]?.internalName || ""}
              onChange={(e) => {
                const skill = passives.find((p) => p.internalName === e.target.value) || undefined;
                const next = [...target];
                if (skill) next[i] = skill;
                else next.splice(i, 1);
                setTarget(next.slice(0, SLOTS));
              }}
              className="input"
            >
              <option value="">Any skill</option>
              {parentSkills.map((p) => (
                <option key={p.internalName} value={p.internalName}>
                  {p.name}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-red-500/20 bg-slate-950/50 p-6 text-center">
        <div className="text-sm text-slate-400">Estimated chance</div>
        <div className="mt-1 text-4xl font-extrabold text-white">{(probability * 100).toFixed(1)}%</div>
        {probability === 0 && uniqueTargetCount > 0 && (
          <p className="mt-2 text-xs text-red-400">
            At least one target skill is not present on the parents.
          </p>
        )}
        <p className="mt-3 text-xs text-slate-500">
          Assumes each of the child&apos;s 4 passive slots independently rolls from the combined parent skill pool.
        </p>
      </div>
    </div>
  );
}
