function Projects({ projects = [] }) {
  return (
    <section id="projects" className="projects">
      <p className="section-heading">Featured Projects</p>
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
