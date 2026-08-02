import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import SackCarousel from '../components/SackCarousel';
import Merch from '../components/Merch';
import CustomBanner from '../components/CustomBanner';
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
