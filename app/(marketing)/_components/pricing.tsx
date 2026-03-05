"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { PRICING_PLANS } from "@/lib/pricing";
import { PortalLink } from "@kinde-oss/kinde-auth-nextjs/components";

export function PricingSection() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { isAuthenticated, getClaim } = useKindeBrowserClient();
  const plan = getClaim("plan");
  const currentPlanId = plan?.value;

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
          {PRICING_PLANS.map((tier) => {
            const isCurrentPlan =
              currentPlanId === tier.id ||
              (!currentPlanId && tier.id === "tier-free");

            return (
              <div
                key={tier.id}
                className={cn(
                  tier.featured
                    ? "bg-secondary/70 ring-2 ring-primary"
                    : "ring-1 ring-border",
                  "rounded-3xl p-8 xl:p-10 transition hover:scale-[1.02]",
                )}
              >
                {/* Plan Header */}
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold">{tier.name}</h3>

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
                {isAuthenticated ? (
                  <PortalLink
                    className={cn(
                      buttonVariants({
                        variant: isCurrentPlan
                          ? "outline"
                          : tier.featured
                            ? "default"
                            : "outline",
                      }),
                      "w-full mt-6",
                      isCurrentPlan && "opacity-50 pointer-events-none",
                    )}
                  >
                    {isCurrentPlan ? "Current Plan" : "Upgrade Now"}
                  </PortalLink>
                ) : (
                  <RegisterLink
                    postLoginRedirectURL="/workspace"
                    authUrlParams={{
                      planId: tier.id,
                      is_create_org: "true",
                      org_name: tier.name,
                    }}
                    className={cn(
                      buttonVariants({
                        variant: tier.featured ? "default" : "outline",
                      }),
                      "w-full mt-6",
                    )}
                  >
                    {tier.cta}
                  </RegisterLink>
                )}

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
                          isActive
                            ? "text-blue-500 font-medium"
                            : "text-muted-foreground",
                        )}
                      >
                        <Check
                          className={cn(
                            "h-5 w-5 flex-none",
                            isActive ? "text-blue-500" : "text-primary",
                          )}
                        />

                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
