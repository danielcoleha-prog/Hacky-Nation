import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import SackCarousel from '../components/SackCarousel';
import Merch from '../components/Merch';
import CustomBanner from '../components/CustomBanner';
import BundleBar from '../components/BundleBar';
import WhyHackyNation from '../components/WhyHackyNation';
import Community from '../components/Community';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

export default function Landing() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SackCarousel />

      {/* Bundle builder sits straight after the lineup, while the sacks are
          still front of mind. */}
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20">
        <BundleBar />
      </div>

      <Merch />
      <CustomBanner />
      <WhyHackyNation />
      <Community />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}
