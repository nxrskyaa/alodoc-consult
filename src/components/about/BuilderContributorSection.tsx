"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { builders } from "@/data/about";

export function BuilderContributorSection() {
  return (
    <section className="grid gap-5 rounded-[2.4rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase text-oliveDeep">Builder & Contributor</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-cocoa sm:text-5xl">Built by people who care about useful consumer crypto.</h2>
        <p className="mt-4 text-sm leading-6 text-cocoaSoft">
          Alodoc is shaped as a practical health literacy demo: warm enough for everyday users, but clear enough to pitch as a real-world application.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {builders.map((person, index) => (
          <ProfileCard key={person.xUsername} person={person} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProfileCard({ person, index }: { person: (typeof builders)[number]; index: number }) {
  const [src, setSrc] = useState(person.avatar);
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="overflow-hidden rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-lift"
    >
      <div className="relative rounded-[1.6rem] bg-cream p-4">
        <div className="absolute right-4 top-4 rounded-full bg-mint px-3 py-1 text-xs font-semibold uppercase text-oliveDeep">{person.role}</div>
        <img src={src} onError={() => setSrc(person.fallback)} alt="" className="h-24 w-24 rounded-[1.6rem] border-4 border-white bg-mint object-cover shadow-lift" />
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-cocoa">{person.name}</h3>
      <p className="mt-1 text-sm text-cocoaSoft">@{person.xUsername}</p>
      <a
        href={`https://x.com/${person.xUsername}`}
        target="_blank"
        rel="noreferrer"
        className="focus-ring mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-cocoa px-4 py-2 text-sm font-semibold text-cream shadow-lift"
      >
        View on X <ExternalLink className="h-4 w-4" />
      </a>
    </motion.article>
  );
}
