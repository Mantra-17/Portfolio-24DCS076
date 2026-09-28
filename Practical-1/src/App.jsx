import NavBar from './components/NavBar'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import './App.css'

function App() {
  // Props data declared in parent App component and passed down to children
  const studentName = "Mantra Patel"
  const themeColor = "#38bdf8"
  const studentRole = "Computer Science Engineering Student at CHARUSAT | 24DCS076"
  const studentBio = "I am a Computer Science Engineering student at CHARUSAT University passionate about Full-Stack Web Development, Cybersecurity, and Artificial Intelligence. I enjoy building modern web applications, exploring ethical hacking techniques, and continuously learning emerging technologies. My goal is to create secure, scalable, and impactful software solutions."

  const technicalSkills = [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "TypeScript",
    "SQL",
    "Git & GitHub",
    "Linux"
  ]

  const featuredProjects = [
    {
      title: "Sentinel-NAC",
      desc: "Network Access Control system featuring real-time packet monitoring, 802.1X MAC-based authentication, and automated threat quarantine for enterprise campus networks.",
      tech: ["Python", "Flask", "SQLite", "Scapy", "Networking"]
    },
    {
      title: "CampusConnect",
      desc: "Full-stack university management platform with role-based access control, attendance tracking, schedule coordination, and real-time student-faculty alerts.",
      tech: ["React", "Node.js", "MongoDB", "Express", "REST API"]
    },
    {
      title: "WatchaMovie",
      desc: "Modern movie discovery web application integrating public APIs, fast search indexing, responsive card grids, and live production deployment.",
      tech: ["React", "JavaScript", "OMDb API", "CSS3"]
    }
  ]

  return (
    <div className="app">
      <NavBar brand="Mantra Patel | Practical 1" />
      <main>
        {/* Header receives name and themeColor prop */}
        <Header name={studentName} themeColor={themeColor} role={studentRole} />

        {/* About receives bio prop */}
        <About bio={studentBio} />

        {/* Skills receives skillList array prop and renders dynamically */}
        <Skills skillList={technicalSkills} />

        {/* Projects receives projects array prop */}
        <Projects projects={featuredProjects} />

        {/* Footer receives contact info */}
        <Footer name={studentName} />
      </main>
    </div>
  )
}

export default App
