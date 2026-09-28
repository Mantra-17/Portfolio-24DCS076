import { useState, useEffect, useCallback } from 'react'
import { fetchUserRepos } from '../services/githubApi'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RepoList from '../components/RepoList'

function Projects() {
  // 1. Mandatory API State Management
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 2. Supplementary State: Search/filter query
  const [searchTerm, setSearchTerm] = useState('')

  // 3. Optional: State to toggle simulation of an error for viva testing
  const [simulateError, setSimulateError] = useState(false)

  // Function to load repositories using githubApi service
  const loadRepositories = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      if (simulateError) {
        // Deliberately trigger failure to demonstrate error state and retry
        throw new Error("Simulated network failure (404/500). Used for testing error state & retry button.")
      }

      const data = await fetchUserRepos('Mantra-17')
      setRepos(data)
    } catch (err) {
      setError(err.message || 'Unable to load repositories. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [simulateError])

  // Mandatory: Trigger API fetch on component mount using useEffect
  useEffect(() => {
    loadRepositories()
  }, [loadRepositories])

  // Filter repositories dynamically based on search box input
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <section className="projects">
      <div className="projects-header">
        <div>
          <p className="section-heading">Live GitHub Repositories (Practical 3)</p>
          <h2 className="projects-title">GitHub REST API Integration</h2>
          <p className="projects-subtitle">
            Consuming real-time public repositories from <code>api.github.com/users/Mantra-17/repos</code>.
          </p>
        </div>

        {/* Demo Controls: Test Error Mode Toggle */}
        <div className="demo-controls">
          <button 
            type="button" 
            className={`demo-toggle ${simulateError ? 'active' : ''}`}
            onClick={() => setSimulateError(prev => !prev)}
            title="Toggle to test error state and retry button for viva demonstration"
          >
            {simulateError ? '⚠️ Error Simulation: ON' : '🧪 Test Error State'}
          </button>
        </div>
      </div>

      {/* Search / Filter Input */}
      <div className="search-bar-wrap">
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search repositories by name, language, or topic..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
            disabled={loading}
          />
          {searchTerm && (
            <button 
              type="button" 
              className="clear-search-btn" 
              onClick={() => setSearchTerm('')}
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>
        {!loading && !error && (
          <span className="results-count">
            Showing {filteredRepos.length} of {repos.length} repositories
          </span>
        )}
      </div>

      {/* Conditional UI Rendering based on Request State */}
      {loading && <Spinner message="Fetching live repositories from GitHub API..." />}

      {!loading && error && (
        <ErrorMessage 
          message={error} 
          onRetry={loadRepositories} 
        />
      )}

      {!loading && !error && (
        <RepoList 
          repos={filteredRepos} 
          searchTerm={searchTerm} 
        />
      )}
    </section>
  )
}

export default Projects
