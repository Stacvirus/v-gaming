import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ActivitiesSection from '@/components/ActivitiesSection'
import FoodSection from '@/components/FoodSection'
import FeaturedExperience from '@/components/FeaturedExperience'
import EventsSection from '@/components/EventsSection'
import AboutSection from '@/components/AboutSection'
import GallerySection from '@/components/GallerySection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ActivitiesSection />
        <FoodSection />
        <FeaturedExperience />
        <EventsSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
