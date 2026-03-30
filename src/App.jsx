import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import LandingPage from './pages/Landing/LandingPage'
import About from './pages/About'
import Projects from './pages/Projects'
import Expertise from './pages/Expertise'
import Contact from './pages/Contact'
import Loader from './components/layout/Loader' // Adjust the import path if your Loader is inside /components
import Services from './pages/Services'
import Careers from './pages/Careers'

const App = () => {
  // 1. Initialize state by checking sessionStorage. 
  // If 'siteLoaded' exists, they've been here before in this tab, so skip the loader.
  const [showLoader, setShowLoader] = useState(() => {
    const hasVisited = sessionStorage.getItem('siteLoaded');
    return !hasVisited; 
  });

  // 2. When the GSAP animation finishes, hide the loader and set the session token.
  const handleLoaderComplete = () => {
    setShowLoader(false);
    sessionStorage.setItem('siteLoaded', 'true');
  };

  return (
    <>
      {/* 3. Conditionally render the Loader completely outside the Router */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      {/* 4. The Router stays mounted in the background. 
          When the loader columns slide up, this content will be ready underneath. */}
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/expertise' element={<Expertise/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/careers' element={<Careers/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App