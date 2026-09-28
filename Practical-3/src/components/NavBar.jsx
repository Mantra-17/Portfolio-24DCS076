import { Link, useLocation } from 'react-router-dom'

function NavBar({ darkMode, toggleTheme }) {
  const location = useLocation()

  return (
    <nav className="navbar">
      <span className="nav-brand">Mantra Patel &middot; P3</span>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects (API)</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
      </div>
      <div className="toggle-wrap">
        <span className="toggle-label">{darkMode ? 'Dark' : 'Light'}</span>
        <button 
          className={`toggle-track ${darkMode ? 'on' : ''}`} 
          onClick={toggleTheme} 
          aria-label="Toggle theme mode"
          title={`Switch to ${darkMode ? 'Light' : 'Dark'} mode`}
        >
          <span className="toggle-knob"></span>
        </button>
      </div>
    </nav>
  )
}

export default NavBar
