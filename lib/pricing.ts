export type PlanId = "tier-free" | "tier-pro" | "tier-ai";

export interface PlanDetails {
  name: string;
  id: PlanId;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: string[];
  limits: {
    workspaces: number | "unlimited";
    channelsPerWorkspace: number | "unlimited";
    aiFeatures: boolean;
  };
  featured?: boolean;
  cta: string;
}

export const PRICING_PLANS: PlanDetails[] = [
  {
    name: "Free",
    id: "tier-free",
    price: { monthly: "$0", annually: "$0" },
    description: "Best for small teams trying the product.",
    features: [
      "Up to 5 Workspaces",
      "Up to 5 Channels per workspace",
      "Basic team chat",
      "Member messaging only",
    ],
    limits: {
      workspaces: 5,
      channelsPerWorkspace: 5,
      aiFeatures: false,
    },
    featured: false,
    cta: "Start for free",
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: { monthly: "$9", annually: "$7.50" },
    description: "Best for growing teams.",
    features: [
      "Unlimited Workspaces",
      "Unlimited Channels",
      "Threaded messages",
      "Infinite chat history",
      "Faster performance",
      "Priority support",
    ],
    limits: {
      workspaces: "unlimited",
      channelsPerWorkspace: "unlimited",
      aiFeatures: false,
    },
    featured: true,
    cta: "Get started",
  },
  {
    name: "AI",
    id: "tier-ai",
    price: { monthly: "$19", annually: "$15.80" },
    description: "Best for teams that want AI productivity.",
    features: [
      "AI message polishing",
      "AI conversation summaries",
      "AI compose messages",
      "AI thread assistance",
      "Smart typo correction",
      "Future AI upgrades",
      "All features from Pro plan",
    ],
    limits: {
      workspaces: "unlimited",
      channelsPerWorkspace: "unlimited",
      aiFeatures: true,
    },
    featured: false,
    cta: "Get started",
  },
];

export function getPlan(id: string | undefined): PlanDetails {
  return PRICING_PLANS.find((p) => p.id === id) || PRICING_PLANS[0];
}
