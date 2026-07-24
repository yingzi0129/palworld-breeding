import type { Metadata } from "next";
import { getPassiveSkills } from "@/lib/data-server";
import { PassiveSkillClient } from "@/components/calculator/passive-skill-client";

export const metadata: Metadata = {
  title: "Passive Skill Inheritance Calculator | PalworldBreeding.cc",
  description:
    "Simulate Palworld passive skill inheritance odds. Enter parent passive skills to see the probability of passing down target skills to the child.",
  alternates: { canonical: "/tools/passive-skill" },
};

export default function PassiveSkillPage() {
  const passives = getPassiveSkills();
  return (
    <div className="min-h-screen bg-[#020617] py-10">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Passive Skill Inheritance</h1>
          <p className="mt-2 text-slate-400">
            Select the passive skills on each parent and the skills you want on the child. We estimate the odds based on the current game formula.
          </p>
        </div>
        <div className="glass-card">
          <PassiveSkillClient passives={passives} />
        </div>
      </div>
    </div>
  );
}
