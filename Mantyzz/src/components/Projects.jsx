
function Projects() {
  const projects = [
    {
      title: "Sentinel-NAC",
      desc: "Network Access Control system with real-time monitoring, MAC-based authentication and automated threat response for campus networks.",
      tech: ["Python", "Flask", "SQLite", "Networking"]
    },
    {
      title: "CampusConnect",
      desc: "Full-stack university management platform with role-based access, attendance tracking, and real-time notifications for students and faculty.",
      tech: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      title: "Portfolio Website",
      desc: "Personal developer portfolio with interactive sections, GitHub stats integration and fully responsive design deployed on Vercel.",
      tech: ["React", "Vite", "CSS", "Vercel"]
    }
  ]

  return (
    <section className="projects">
      <p className="section-heading">Projects</p>
      <div className="project-list">
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="tech-used">
              {p.tech.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
export default Projects
