function Skills({ skillList = [] }) {
  return (
    <section id="skills" className="skills">
      <p className="section-heading">Skills</p>
      <div className="skill-tags">
        {skillList.map((skill) => (
          <span className="tag" key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  )
}

export default Skills
