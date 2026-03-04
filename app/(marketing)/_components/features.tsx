import React from "react";
import {
  MessageSquare,
  Sparkles,
  Layout,
  Zap,
  ShieldCheck,
  Layers,
} from "lucide-react";

const features = [
  {
    name: "Instant Communication",
    description:
      "Connect with your team through organized channels and threaded conversations. Messages appear instantly and conversations stay structured.",
    icon: MessageSquare,
  },
  {
    name: "AI-Powered Assistance",
    description:
      "Built-in AI helps improve team communication by polishing messages, correcting typos, and summarizing long conversations.",
    icon: Sparkles,
  },
  {
    name: "Organized Workspaces",
    description:
      "Create multiple workspaces for organizations and organize discussions using channels for different teams or projects.",
    icon: Layout,
  },
  {
    name: "High Performance",
    description:
      "Built with scalable technologies ensuring high performance, reliability, and seamless team collaboration.",
    icon: Zap,
  },
  {
    name: "Smooth Experience",
    description:
      "Enjoy a fluid chat experience with infinite scroll and cursor-based pagination, allowing users to access older messages easily.",
    icon: Layers,
  },
  {
    name: "Enterprise Security",
    description:
      "Built-in security including bot protection, rate limiting, and XSS prevention to keep communication safe.",
    icon: ShieldCheck,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Collaborate Faster
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for seamless team communication
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Flowly combines modern chat features with powerful AI to keep your
            team aligned and productive.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      className="h-6 w-6 text-primary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
