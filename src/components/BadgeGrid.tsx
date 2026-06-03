"use client";

import { Award, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { diseases } from "@/data/diseases";

export function BadgeGrid({ completedIds = [] }: { completedIds?: number[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {diseases.map((disease) => {
        const earned = completedIds.includes(disease.id);
        return (
          <motion.div
            key={disease.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            transition={{ delay: disease.id * 0.04 }}
            className="rounded-3xl border border-cocoa/10 bg-white p-5 shadow-lift"
          >
            <div className="flex items-start gap-4">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl ${earned ? "bg-orange text-white" : "bg-cocoa/5 text-cocoaSoft"}`}>
                {earned ? <Award className="h-6 w-6" /> : <LockKeyhole className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-black text-cocoa">{disease.badgeName.en}</p>
                <p className="mt-1 text-sm font-semibold text-cocoaSoft">{disease.title.en}</p>
                <p className="mt-2 text-xs font-black uppercase text-oliveDeep">{earned ? "Earned" : "Locked"}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
