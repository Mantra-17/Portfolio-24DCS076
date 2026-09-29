
function Header({ name, themeColor }) {
  return (
    <header className="hero">
      <p className="hero-greeting">Hey there, I'm</p>
      <h1 className="hero-name" style={{ color: themeColor }}>{name}</h1>
      <p className="hero-role">Computer Science student at CHARUSAT, building full-stack web apps and exploring cybersecurity.</p>
      <hr className="hero-divider" />
    </header>
  )
}
export default Header