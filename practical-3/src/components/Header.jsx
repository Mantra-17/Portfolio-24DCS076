function Header({ name, themeColor = "#3b82f6", role }) {
  return (
    <header className="hero">
      <p className="hero-greeting">Welcome to my portfolio</p>
      <h1 className="hero-name" style={{ color: themeColor }}>{name}</h1>
      <p className="hero-role">
        {role || "Computer Science student at CHARUSAT, building full-stack web apps and exploring cybersecurity."}
      </p>
      <hr className="hero-divider" style={{ backgroundColor: themeColor }} />
    </header>
  )
}

export default Header
