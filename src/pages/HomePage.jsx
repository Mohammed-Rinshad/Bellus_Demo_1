import React, { useState, useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import TeamSection from '../components/TeamSection';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';

function HomePage() {
  useEffect(() => {
    // Force scroll to top on page load to prevent mid-scroll animation glitches
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <LocationSection />
      <Footer />
    </>
  );
}

export default HomePage;
