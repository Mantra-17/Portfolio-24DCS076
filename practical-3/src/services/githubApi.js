/**
 * GitHub REST API Service
 * Fetches public repositories for a specified GitHub user account.
 */
const BASE_URL = 'https://api.github.com/users'

export async function fetchUserRepos(username = 'Mantra-17') {
  const response = await fetch(`${BASE_URL}/${username}/repos?sort=updated&per_page=30`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`GitHub user "${username}" was not found. Please verify the username.`)
    } else if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please wait a few moments and try again.')
    } else {
      throw new Error(`Failed to load repositories (HTTP ${response.status}: ${response.statusText || 'Server Error'}).`)
    }
  }

  const data = await response.json()
  return data
}
