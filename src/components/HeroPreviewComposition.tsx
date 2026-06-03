"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { Award, BookOpen, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { AlodocLogo } from "@/components/branding/AlodocLogo";

export function HeroPreviewComposition() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative isolate min-h-[420px] overflow-hidden rounded-[2.5rem] border border-cocoa/10 bg-cardBeige p-4 shadow-soft sm:min-h-[520px] sm:p-6 lg:min-h-[620px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_14%,rgba(144,160,144,0.38),transparent_28%),radial-gradient(circle_at_78%_80%,rgba(201,166,104,0.24),transparent_28%)]" />
      <motion.div
        className="relative mx-auto max-w-[360px] rounded-[2.2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:mt-6 sm:p-5"
        animate={reduceMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between gap-4">
          <AlodocLogo variant="lockup" size="sm" />
          <span className="rounded-full bg-mint px-3 py-1 text-[11px] font-bold uppercase text-oliveDeep">Private</span>
        </div>
        <div className="mt-5 rounded-[1.8rem] bg-white p-4 shadow-lift">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase text-oliveDeep">Health Classifier</p>
              <h3 className="mt-1 text-2xl font-extrabold leading-tight text-cocoa">Understand signals</h3>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cocoa text-cream">
              <SlidersHorizontal className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            <Meter label="Blood pressure" value="Educational range" width="72%" />
            <Meter label="Blood sugar" value="Browser only" width="54%" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniTile icon={BookOpen} label="Quest" value="5 modules" />
          <MiniTile icon={Award} label="Badge" value="Proof ready" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-4 right-4 rounded-[1.8rem] border border-cocoa/10 bg-white/88 p-4 shadow-lift backdrop-blur sm:left-8 sm:right-auto sm:w-[230px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-mint text-oliveDeep">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-cocoa">Passport</p>
            <p className="text-xs font-medium text-cocoaSoft">Learning progress only</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-5 top-7 hidden rounded-[1.8rem] border border-cocoa/10 bg-cocoa p-4 text-cream shadow-soft sm:block"
        animate={reduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xs font-bold uppercase text-cream/70">Onchain proof</p>
        <p className="mt-1 text-2xl font-extrabold">XP + Badge</p>
      </motion.div>
    </div>
  );
}

function Meter({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold">
        <span className="text-cocoa">{label}</span>
        <span className="text-cocoaSoft">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-cream">
        <div className="h-2 rounded-full bg-olive" style={{ width }} />
      </div>
    </div>
  );
}

function MiniTile({ icon: Icon, label, value }: { icon: ElementType; label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] bg-cream p-3">
      <Icon className="h-5 w-5 text-oliveDeep" />
      <p className="mt-3 text-sm font-extrabold text-cocoa">{label}</p>
      <p className="text-xs font-medium text-cocoaSoft">{value}</p>
    </div>
  );
}
