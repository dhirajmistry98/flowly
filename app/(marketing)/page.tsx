import { HeroHeader } from "@/app/(marketing)/_components/header";
import HeroSection from "@/app/(marketing)/_components/hero-section";
import { FeaturesSection } from "@/app/(marketing)/_components/features";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
