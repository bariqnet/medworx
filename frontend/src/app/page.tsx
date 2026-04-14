import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import About from '@/components/public/About';
import VisionMission from '@/components/public/VisionMission';
import Services from '@/components/public/Services';
import WhyUs from '@/components/public/WhyUs';
import Spaces from '@/components/public/Spaces';
import CTABanner from '@/components/public/CTABanner';
import Contact from '@/components/public/Contact';
import Footer from '@/components/public/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <Services />
      <WhyUs />
      <Spaces />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}
