function Projects() {
  const projects = [
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
    <section className="projects">
      <p className="section-heading">Projects Showcase (Practical 2)</p>
      <div className="project-list">
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="tech-used">
              {p.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
