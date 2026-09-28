import RepoCard from './RepoCard'

function RepoList({ repos = [], searchTerm = '' }) {
  if (repos.length === 0) {
    return (
      <div className="empty-repos">
        <p className="empty-title">🔍 No repositories found</p>
        <p className="empty-desc">
          {searchTerm.trim()
            ? `No repositories match "${searchTerm}". Try clearing your search filter.`
            : "No public repositories are currently available for this account."}
        </p>
      </div>
    )
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

export default RepoList
