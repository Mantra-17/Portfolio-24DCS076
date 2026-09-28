import { useState, useEffect } from 'react'

function NavBar({ brand = "MP - Practical 1" }) {
  const [activeSection, setActiveSection] = useState('header')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['header', 'about', 'skills', 'projects', 'contact']
      const scrollY = window.scrollY + 120

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="navbar">
      <span className="nav-brand">{brand}</span>
      <div className="nav-links">
        <a href="#header" className={activeSection === 'header' ? 'active' : ''}>Home</a>
        <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
        <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
        <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
        <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
      </div>
    </nav>
  )
}

export default NavBar
