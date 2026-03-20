import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Projects from './pages/Projects'
import Expertise from './pages/Expertise'
import Contact from './pages/Contact'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/expertise' element={<Expertise/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App