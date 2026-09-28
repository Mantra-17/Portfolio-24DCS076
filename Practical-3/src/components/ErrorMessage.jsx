function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Unable to Load Repositories</h3>
      <p className="error-desc">{message || "An unexpected error occurred while communicating with the GitHub API."}</p>
      {onRetry && (
        <button type="button" className="retry-btn" onClick={onRetry}>
          🔄 Retry Request
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
