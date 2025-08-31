import HeroSection from "@/components/hero-section"
import IronStone from "@/components/Iron-stone"
import Quotation from "@/components/quotation"
export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="flex p-5 gap-3">
        <IronStone />
        <Quotation />

      </div>
    </>
  );
}
