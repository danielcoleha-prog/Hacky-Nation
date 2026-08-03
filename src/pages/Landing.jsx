import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import SackCarousel from '../components/SackCarousel';
import CustomShowcase from '../components/CustomShowcase';
import Merch from '../components/Merch';
import CustomBanner from '../components/CustomBanner';
import StoryTeaser from '../components/StoryTeaser';
import Community from '../components/Community';
import Stockists from '../components/Stockists';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

export default function Landing() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SackCarousel />
      <CustomShowcase />
      <Merch />
      <CustomBanner />
      <StoryTeaser />
      <Community />
      <Stockists />
      <FAQ />
      <Newsletter />
    </>
  );
}
