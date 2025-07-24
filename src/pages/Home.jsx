import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Features from '../components/home/Features'
import ProductShowcase from '../components/home/ProductShowcase'
import Testimonials from '../components/home/Testimonials'
import ScrollableText from '../components/home/ScrollableText'
import Collab from '../components/home/CollabSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <HeroSection /> 
      <ScrollableText />
      <Features /> 
      <ProductShowcase />
      <Testimonials /> 
      <Collab />
      <Footer /> 
    </div>
  )
}

export default Home