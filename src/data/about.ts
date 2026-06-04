import { Activity, BookOpenCheck, Bot, Clock3, Globe2, HeartPulse, Link2, LockKeyhole, ShieldCheck } from "lucide-react";

export const aboutPillars = [
  {
    title: "Bilingual health education",
    text: "Short learning cards help everyday users understand common diseases in Indonesia and English.",
    icon: Globe2
  },
  {
    title: "Interactive literacy tools",
    text: "Quizzes and simple educational tools turn passive reading into active understanding.",
    icon: Activity
  },
  {
    title: "Proof of learning",
    text: "Completed quests and badges create visible learning progress without collecting medical records.",
    icon: BookOpenCheck
  },
  {
    title: "Privacy-safe direction",
    text: "The product asks for only simple passport identity fields and keeps health readings local.",
    icon: LockKeyhole
  }
];

export const builders = [
  {
    role: "Builder",
    name: "Nxrskyaa",
    xUsername: "nxrskyaa",
    avatar: "https://unavatar.io/x/nxrskyaa",
    fallback: "https://api.dicebear.com/9.x/initials/svg?seed=nxrskyaa"
  },
  {
    role: "Contributor",
    name: "Rikky Dwiyanto",
    xUsername: "rikkydwiyanto",
    avatar: "https://unavatar.io/x/rikkydwiyanto",
    fallback: "https://api.dicebear.com/9.x/initials/svg?seed=rikkydwiyanto"
  }
];

export const rialoCards = [
  {
    title: "Real-world education use case",
    text: "Alodoc is not a speculative app. It is a consumer-facing education tool that fits Rialo's real-world application thesis.",
    icon: HeartPulse
  },
  {
    title: "Privacy-aware identity",
    text: "Health-related products need careful privacy boundaries. Rialo's direction around identity and privacy makes it a stronger future fit for privacy-safe learning records.",
    icon: ShieldCheck
  },
  {
    title: "Real-world connectivity",
    text: "Future Alodoc versions could connect learning experiences with trusted public information flows or verified real-world data in a more seamless way.",
    icon: Link2
  },
  {
    title: "Automation and reactivity",
    text: "Rialo's event-driven model can help future health education workflows become more timely, interactive, and less dependent on clunky external automation.",
    icon: Clock3
  },
  {
    title: "Agent-enabled learning",
    text: "Rialo's native webcalls and agent-friendly architecture could support future educational companions that explain health topics dynamically while keeping the experience grounded and safe.",
    icon: Bot
  }
];

export const safetyCards = [
  "Learning progress can be written onchain.",
  "Private medical records are not stored.",
  "Educational number checks run locally in the browser.",
  "Alodoc is education only, not diagnosis or emergency advice."
];

export const matterCards = [
  {
    title: "Health information is often too technical.",
    text: "Alodoc turns common health topics into simple learning journeys with visual explanations and practical educational guidance."
  },
  {
    title: "People need clearer context before panic.",
    text: "The goal is to help users understand concepts better before they panic, ignore warning signs, or trust random misinformation."
  },
  {
    title: "Learning can feel more engaging.",
    text: "Cards, quizzes, animated visuals, and progress feedback make health literacy less intimidating and more memorable."
  },
  {
    title: "Useful crypto should feel useful first.",
    text: "The Web3 layer supports proof of learning while the product remains approachable for non-crypto users."
  }
];

export const aboutStats = [
  { label: "Disease quests", value: "5", icon: BookOpenCheck },
  { label: "Languages", value: "ID/EN", icon: Globe2 },
  { label: "Medical records", value: "0", icon: LockKeyhole }
];
