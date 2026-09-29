function Footer({ email = "mantrapatel.46@gmail.com", github = "github.com/Mantra-17", name = "Mantra Patel" }) {
  return (
    <footer id="contact" className="footer">
      <p>{email} &middot; {github}</p>
      <p className="copy">&copy; {new Date().getFullYear()} {name}. Built for ITUE301 - Practical 1.</p>
    </footer>
  )
}

export default Footer
