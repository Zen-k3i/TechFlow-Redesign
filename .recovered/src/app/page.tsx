import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Entrance } from "@/components/site/entrance";
import { Navbar } from "@/components/site/navbar";
import { Gallery } from "@/components/site/gallery/gallery";
import { Manifesto } from "@/components/site/manifesto";
import { Salles } from "@/components/site/salles";
import { Collection } from "@/components/site/collection";
import { Parcours } from "@/components/site/parcours";
import { LivreDor } from "@/components/site/livre-dor";
import { Billetterie } from "@/components/site/billetterie";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Entrance />
      <Navbar />
      <main>
        <Gallery />
        <Manifesto />
        <Salles />
        <Collection />
        <Parcours />
        <LivreDor />
        <Billetterie />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
