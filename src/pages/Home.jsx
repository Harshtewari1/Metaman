import React from 'react'
import HeroSection from '../components/home/HeroSection.jsx'
import Features from '../components/home/Features.jsx'
import ProductShowcase from '../components/home/ProductShowcase.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import ScrollableText from '../components/home/ScrollableText.jsx'
// import Collab from '../components/home/CollabSection'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div>
      <HeroSection /> 
      <ScrollableText />
      <Features /> 
      <ProductShowcase />
      <Testimonials /> 
      {/* <Collab /> */}
      <Footer /> 
    </div>
  )
}

export default Home