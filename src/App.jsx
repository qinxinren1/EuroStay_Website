import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import Stories from './pages/Stories'
import About from './pages/About'
import './App.css'

function App() {
  // 获取 base 路径，用于 GitHub Pages
  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <LanguageProvider>
      <Router basename={basename}>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
