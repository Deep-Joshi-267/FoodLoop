import React from 'react';
import { Hero } from '../components/home/Hero/Hero';
import { HowItWorks } from '../components/home/HowItWorks/HowItWorks';
import { WhyChooseUs } from '../components/home/WhyChooseUs/WhyChooseUs';
import { FeaturedDeals } from '../components/home/FeaturedDeals/FeaturedDeals';
import { GetStarted } from '../components/home/GetStarted/GetStarted';

export const Home = () => {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedDeals />
      <GetStarted />
    </main>
  );
};
