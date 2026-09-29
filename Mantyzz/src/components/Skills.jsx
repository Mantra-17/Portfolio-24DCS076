
function Skills({ skillList }) {
  return (
    <section className="skills">
      <p className="section-heading">Skills</p>
      <div className="skill-tags">
        {skillList.map((s) => (
          <span className="tag" key={s}>{s}</span>
        ))}
      </div>
    </section>
  )
}
export default Skills
