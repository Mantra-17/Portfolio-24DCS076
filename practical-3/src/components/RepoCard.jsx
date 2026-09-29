function RepoCard({ repo }) {
  const {
    name,
    html_url,
    description,
    language,
    stargazers_count,
    forks_count,
    updated_at
  } = repo

  const formattedDate = updated_at
    ? new Date(updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null

  return (
    <article className="repo-card">
      <div className="repo-header">
        <a 
          href={html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="repo-title"
          title={`Open ${name} on GitHub`}
        >
          {name}
          <span className="external-icon"> ↗</span>
        </a>
        <span className="repo-visibility">Public</span>
      </div>

      <p className="repo-desc">
        {description || "No description provided for this repository."}
      </p>

      <div className="repo-meta">
        {language && (
          <span className="repo-lang">
            <span className="lang-dot"></span>
            {language}
          </span>
        )}

        {/* Star Count Requirement */}
        <span className="repo-stat" title="Star count">
          ⭐ {stargazers_count || 0}
        </span>

        {/* Fork Count */}
        <span className="repo-stat" title="Fork count">
          🍴 {forks_count || 0}
        </span>

        {formattedDate && (
          <span className="repo-date">
            Updated {formattedDate}
          </span>
        )}
      </div>
    </article>
  )
}

export default RepoCard
