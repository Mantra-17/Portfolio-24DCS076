import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  // Student Portfolio Metadata
  const studentName = "Mantra Patel"
  const themeColor = "#38bdf8"
  const studentRole = "Computer Science Engineering Student at CHARUSAT | 24DCS076"
  const studentBio = "I am a Computer Science Engineering student at CHARUSAT University passionate about Full-Stack Web Development, Cybersecurity, and Artificial Intelligence. I enjoy building modern web applications, exploring ethical hacking techniques, and continuously learning emerging technologies. My goal is to create secure, scalable, and impactful software solutions."

  const technicalSkills = [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "React.js",
    "REST APIs & Fetch",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "TypeScript",
    "SQL",
    "Git & GitHub"
  ]

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                name={studentName} 
                themeColor={themeColor} 
                role={studentRole}
                bio={studentBio} 
                skillList={technicalSkills} 
              />
            } 
          />
          {/* Practical 3 Projects Route: Consumes GitHub REST API */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
