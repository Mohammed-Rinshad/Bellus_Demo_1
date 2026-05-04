import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TeamSection from './components/TeamSection';
import LocationSection from './components/LocationSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

function App() {
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    // Force scroll to top on page load to prevent mid-scroll animation glitches
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <ServicesSection onSelectService={setSelectedService} />
      <TeamSection />
      <LocationSection />
      <BookingSection preSelectedService={selectedService} onServiceChange={setSelectedService} />
      <Footer />
    </>
  );
}

export default App;
