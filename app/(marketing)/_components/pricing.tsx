"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "#",
    price: { monthly: "$0", annually: "$0" },
    description: "Best for small teams trying the product.",
    features: [
      "Up to 5 Workspaces",
      "Up to 5 Channels per workspace",
      "Basic team chat",
      "Member messaging only",
    ],
    featured: false,
    cta: "Start for free",
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#",
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
    featured: true,
    cta: "Get started",
  },
  {
    name: "AI",
    id: "tier-ai",
    href: "#",
    price: { monthly: "$19", annually: "$15.80" },
    description: "Best for teams that want AI productivity.",
    features: [
      "AI message polishing",
      "AI conversation summaries",
      "AI compose messages",
      "AI thread assistance",
      "Smart typo correction",
      "Future AI upgrades",
    ],
    featured: false,
    cta: "Get started",
  },
];

export function PricingSection() {

  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <section id="pricing" className="relative py-24 sm:py-32">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>

          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            The right price for you, whoever you are
          </p>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose a plan that fits your needs and budget.
          </p>

        </div>

        {/* Pricing Cards */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">

          {tiers.map((tier) => (

            <div
              key={tier.id}
              className={cn(
                tier.featured
                  ? "bg-secondary/70 ring-2 ring-primary"
                  : "ring-1 ring-border",
                "rounded-3xl p-8 xl:p-10 transition hover:scale-[1.02]"
              )}
            >

              {/* Plan Header */}
              <div className="flex items-center justify-between gap-x-4">

                <h3 className="text-lg font-semibold">
                  {tier.name}
                </h3>

                {tier.featured && (
                  <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    Most popular
                  </p>
                )}

              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-muted-foreground">
                {tier.description}
              </p>

              {/* Price */}
              <p className="mt-6 flex items-baseline gap-x-1">

                <span className="text-4xl font-bold">
                  {tier.price.monthly}
                </span>

                <span className="text-sm font-semibold text-muted-foreground">
                  /month
                </span>

              </p>

              {/* CTA */}
              <Link
                href={tier.href}
                className={cn(
                  buttonVariants({
                    variant: tier.featured ? "default" : "outline",
                  }),
                  "w-full mt-6"
                )}
              >
                {tier.cta}
              </Link>

              {/* Features */}
              <ul className="mt-8 space-y-3 text-sm xl:mt-10">

                {tier.features.map((feature) => {

                  const isActive = activeFeature === feature;

                  return (
                    <li
                      key={feature}
                      onClick={() => setActiveFeature(feature)}
                      className={cn(
                        "flex gap-x-3 cursor-pointer transition-colors hover:text-primary",
                        isActive ? "text-blue-500 font-medium" : "text-muted-foreground"
                      )}
                    >

                      <Check
                        className={cn(
                          "h-5 w-5 flex-none",
                          isActive ? "text-blue-500" : "text-primary"
                        )}
                      />

                      {feature}

                    </li>
                  );
                })}

              </ul>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}