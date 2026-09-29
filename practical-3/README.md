# Practical 3: API Integration and Data Rendering in React

**Course:** Advanced Web Development Frameworks (ITUE301)  
**Student Name:** Mantra Patel  
**Student ID:** 24DCS076  
**Institution:** CHARUSAT - DEPSTAR (CSE)  
**Port:** `5175`  
**GitHub Repository:** [https://github.com/Mantra-17/Portfolio-24DCS076.git](https://github.com/Mantra-17/Portfolio-24DCS076.git)

---

## 1. Objective
To integrate a real-world public REST API (GitHub REST API) into the React portfolio application, handling asynchronous lifecycle events with `useEffect`, managing multi-state data flow (`data`, `loading`, `error`), and conditionally rendering loading spinners, error boundaries with retry mechanisms, dynamic repository lists with star counts, and search filtering.

## 2. Theory & Architecture

### Core Concepts Addressed
- **Asynchronous Data Fetching:** Fetching data over HTTP without freezing the main thread using JavaScript `fetch` and async/await.
- **The `useEffect` Hook:** Managing lifecycle side-effects in functional components. Executing on component mount with dependency array `[]` to prevent infinite network request loops.
- **Request State Machine:**
  - `loading`: Request initiated; displays animated `<Spinner />`.
  - `error`: Network or server failure; catches exception, halts loader, and displays `<ErrorMessage />` with a retry callback.
  - `success`: Response parsed; updates `repos` state, halts loader, and renders `<RepoList />`.
- **Decoupled API Architecture:** Extracting API request handling into a standalone service module (`services/githubApi.js`) rather than placing monolithic fetch logic inside UI components.

### Architecture & Component Tree
```text
Projects.jsx
 ├── services/githubApi.js (fetchUserRepos('Mantra-17'))
 ├── useEffect() → triggers API request on component mount
 ├── useState: [repos, setRepos], [loading, setLoading], [error, setError], [searchTerm, setSearchTerm]
 ├── [State: loading = true]  → <Spinner message="..." />
 ├── [State: error != null]   → <ErrorMessage message={error} onRetry={loadRepositories} />
 └── [State: success]        → <RepoList repos={filteredRepos} />
                                └── <RepoCard repo={...} /> (Stars, forks, language, link)
```

---

## 3. Technologies Used
- **Runtime & Tooling:** Node.js (v18+), Vite 8.x
- **Frontend Framework:** React 19.x
- **Routing:** `react-router-dom` v7.x
- **Public REST API:** GitHub REST API v3 (`https://api.github.com/users/Mantra-17/repos`)
- **Dev Server Port:** 5175 (configured with `strictPort: true`)

---

## 4. Folder Structure
```text
Practical-3/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── vite.svg
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    ├── components/
    │   ├── About.jsx
    │   ├── ErrorMessage.jsx    <-- Error display with Retry button
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── NavBar.jsx
    │   ├── RepoCard.jsx        <-- Repo card with stars, language, URLs
    │   ├── RepoList.jsx        <-- Grid of repos with empty search handling
    │   ├── Skills.jsx
    │   └── Spinner.jsx         <-- Animated loading spinner
    ├── pages/
    │   ├── Contact.jsx
    │   ├── Home.jsx
    │   ├── NotFound.jsx
    │   └── Projects.jsx        <-- API integration, useEffect, search filter
    └── services/
        └── githubApi.js        <-- Dedicated API fetcher module
```

---

## 5. Implementation Details

1. **GitHub API Service (`services/githubApi.js`):**
   - Interacts with `https://api.github.com/users/Mantra-17/repos?sort=updated&per_page=30`.
   - Inspects `response.ok`, parses HTTP status codes (404, 403 rate limits, 500), and throws informative error messages.
2. **State Management (`Projects.jsx`):**
   - `repos`: Array of repositories received from GitHub.
   - `loading`: Boolean state controlling the visual spinner.
   - `error`: Stores error message string or null.
   - `searchTerm`: Captures text from the repository search input.
   - `simulateError`: Built-in demo toggle button for faculty viva to reliably demonstrate error recovery.
3. **Lifecycle Execution (`useEffect`):**
   ```jsx
   useEffect(() => {
     loadRepositories()
   }, [loadRepositories])
   ```
   Safe from infinite loops due to `useCallback` dependency scoping.
4. **Conditional UI Feedback:**
   - **Loading:** Shows circular CSS animation with accessible status role.
   - **Error & Retry:** If an error occurs, displays the error message and a `🔄 Retry Request` button.
   - **Live Repository Search:** Instant filtering across repository name, description, and primary programming language.
   - **Repository Metrics:** Every card includes star count (`⭐ stargazers_count`), forks (`🍴 forks_count`), language badge, and direct clickable link (`html_url`) with `target="_blank"`.

---

## 6. How to Install & Run

```bash
# Navigate to the Practical-3 directory
cd Practical-3

# Install dependencies
npm install

# Start Vite development server on port 5175
npm run dev

# Build for production
npm run build
```

Open browser at: `http://localhost:5175`

---

## 7. Testing Performed & Verification Checklist

- [x] Application bootstraps cleanly on `http://localhost:5175`.
- [x] GitHub REST API fetches real repositories for `Mantra-17` on mount without infinite requests.
- [x] Loading spinner renders visibly while data is in transit.
- [x] Successfully renders repository cards with live names, descriptions, GitHub links, and star counts.
- [x] Real-time search filter narrows the list on keystroke; clears cleanly.
- [x] Testing error state via simulated failure displays `<ErrorMessage />` with zero app crashes.
- [x] Clicking `🔄 Retry Request` triggers network fetch again and successfully restores data.
- [x] Browser console verified: 0 errors, 0 warnings.
