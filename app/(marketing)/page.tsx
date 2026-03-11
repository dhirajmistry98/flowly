import { HeroHeader } from "@/app/(marketing)/_components/header";
import HeroSection from "@/app/(marketing)/_components/hero-section";
import { FeaturesSection } from "@/app/(marketing)/_components/features";
import { PricingSection } from "@/app/(marketing)/_components/pricing";
import { AboutSection } from "@/app/(marketing)/_components/about";
import { SolutionSection } from "@/app/(marketing)/_components/solution";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  return (
    <div>
      <HeroHeader />
      <HeroSection />
      {authenticated && (
        <>
          <FeaturesSection />
          <SolutionSection />
          <AboutSection />
          <PricingSection />
        </>
      )}
    </div>
  );
}
