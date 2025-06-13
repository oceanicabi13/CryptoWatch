import { useState, useEffect } from 'react'
import './App.css'
import './index.css';
import Header from './components/Header.jsx'
import CryptoCard from './components/CryptoCard.jsx'
import Footer from './components/Footer.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // option animation should happen only once
    });
  }, []);

  return (
    <>
  <Header />
  <CryptoCard />
  <Footer/>
    </>
  )
}

export default App

// What are you doing here 
