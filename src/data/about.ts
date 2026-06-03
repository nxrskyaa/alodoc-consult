import { Activity, BookOpenCheck, Bot, Clock3, Globe2, HeartPulse, Link2, LockKeyhole, ShieldCheck, Sparkles, UserRound } from "lucide-react";

export const aboutPillars = [
  {
    title: "Bilingual health education",
    text: "Short learning cards help everyday users understand common diseases in Indonesia and English.",
    icon: Globe2
  },
  {
    title: "Interactive literacy tools",
    text: "Quizzes and the local Health Classifier turn passive reading into active understanding.",
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
    title: "Real-World Relevance",
    text: "Alodoc is a practical consumer education product, not a speculative crypto toy. That maps naturally to Rialo's real-world application thesis.",
    icon: HeartPulse
  },
  {
    title: "Future Real-World Connectivity",
    text: "Rialo's connectivity direction could help future Alodoc experiences reference trusted public information flows and useful health-related workflows more seamlessly.",
    icon: Link2
  },
  {
    title: "Privacy-Aware Health UX",
    text: "Health-adjacent products need careful identity and privacy choices. Rialo's private and public connectivity direction fits that long-term product need.",
    icon: ShieldCheck
  },
  {
    title: "Better Automation",
    text: "Native timers and event-driven execution could support timely learning journeys without bolting on clunky offchain bot systems.",
    icon: Clock3
  },
  {
    title: "Agent-Enabled Education",
    text: "Native webcalls and agent-friendly coordination could support future explainers that help users understand health topics dynamically.",
    icon: Bot
  },
  {
    title: "Mainstream Onboarding",
    text: "A more familiar bridge between Web2-style identity and onchain logic could make Alodoc feel closer to a consumer wellness app.",
    icon: UserRound
  }
];

export const safetyCards = [
  "Learning progress can be written onchain.",
  "Private medical records are not stored.",
  "Classifier readings run locally in the browser.",
  "Alodoc is education only, not diagnosis or emergency advice."
];

export const matterCards = [
  {
    title: "Health information can feel intimidating.",
    text: "Alodoc breaks core concepts into calmer, visual pieces so users can learn without being overwhelmed."
  },
  {
    title: "Understanding should be accessible.",
    text: "Bilingual cards, quick quizzes, and friendly feedback lower the barrier for everyday health literacy."
  },
  {
    title: "Progress can motivate learning.",
    text: "Passports, XP, and badges make education feel tangible while avoiding private medical data collection."
  },
  {
    title: "Useful crypto should feel useful first.",
    text: "The Web3 layer supports proof of learning while the product remains approachable for non-crypto users."
  }
];

export const aboutStats = [
  { label: "Disease quests", value: "5", icon: Sparkles },
  { label: "Languages", value: "ID/EN", icon: Globe2 },
  { label: "Medical records", value: "0", icon: LockKeyhole }
];
