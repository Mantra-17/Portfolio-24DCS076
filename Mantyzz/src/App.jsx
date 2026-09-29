import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Projects from './components/Projects'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => setDarkMode(prev => !prev)

  // props data
  const name = "Mantra Patel"
  const themeColor = "#a78bfa"
  const bio = "I am a Computer Science Engineering student at CHARUSAT University passionate about Full-Stack Web Development, Cybersecurity, and Artificial Intelligence. I enjoy building modern web applications, exploring ethical hacking techniques, and continuously learning emerging technologies. My goal is to create secure, scalable, and impactful software solutions."
  const skillList = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Python", "TypeScript", "SQL", "Git", "Linux"]

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home name={name} themeColor={themeColor} bio={bio} skillList={skillList} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
