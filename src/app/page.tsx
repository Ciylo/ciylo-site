import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { ServicesBento } from "@/components/home/ServicesBento";
import { Lab } from "@/components/home/Lab";
import { Process } from "@/components/home/Process";
import { SelectedWork } from "@/components/home/SelectedWork";
import { WhyCiylo } from "@/components/home/WhyCiylo";
import { CiylotronsTeaser } from "@/components/home/CiylotronsTeaser";
import { Industries } from "@/components/home/Industries";
import { ContactSection } from "@/components/home/ContactSection";
import { JoinUsBand } from "@/components/home/JoinUsBand";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Background footage slot: drop a muted loop at public/video/hero.mp4
const heroVideo = existsSync(join(process.cwd(), "public/video/hero.mp4")) ? "/video/hero.mp4" : undefined;

export default function Home() {
  return (
    <>
      <Hero video={heroVideo} />
      <Statement />
      <ServicesBento />
      <Lab />
      <Process />
      <SelectedWork />
      <WhyCiylo />
      <CiylotronsTeaser />
      <Industries />
      <ContactSection />
      <JoinUsBand />
    </>
  );
}
