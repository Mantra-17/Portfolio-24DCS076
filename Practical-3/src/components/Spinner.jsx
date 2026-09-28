function Spinner({ message = "Fetching repositories from GitHub API..." }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner-circle"></div>
      <p className="spinner-text">{message}</p>
    </div>
  )
}

export default Spinner
