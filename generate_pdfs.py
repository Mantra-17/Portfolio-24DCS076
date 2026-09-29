#!/usr/bin/env python3
"""
Generate professional lab report PDFs for Practical 1, 2, and 3.
Student: Mantra Patel | 24DCS076 | CHARUSAT
"""

from fpdf import FPDF
from pathlib import Path
import os

BASE = Path(__file__).parent
SS = BASE / "screenshots"

# ---------------------------------------------
# HELPERS
# ---------------------------------------------
ACCENT = (59, 130, 246)   # Blue
BG_TITLE = (16, 16, 20)
TEXT_DARK = (15, 15, 20)
TEXT_GREY = (80, 80, 95)
LIGHT_BG = (248, 249, 252)
BORDER = (220, 220, 230)


class PDF(FPDF):
    def __init__(self, practical_num, practical_title):
        super().__init__()
        self.practical_num = practical_num
        self.practical_title = practical_title
        self.set_auto_page_break(auto=True, margin=20)
        self.set_margins(20, 20, 20)

    def header(self):
        # Top coloured strip
        self.set_fill_color(20, 20, 28)
        self.rect(0, 0, 210, 14, 'F')
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(255, 255, 255)
        self.set_xy(10, 3)
        self.cell(0, 8, f"Advanced Web Development Frameworks (ITUE301)  |  Practical {self.practical_num}  |  24DCS076 - Mantra Patel", ln=False)
        self.ln(18)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "", 7)
        self.set_text_color(*TEXT_GREY)
        self.cell(0, 8, f"Practical {self.practical_num}: {self.practical_title}  |  CHARUSAT - DEPSTAR  |  AY 2025-26", align="C")

    # -- Section title ---------------------------------------
    def section_title(self, text):
        self.ln(4)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(*ACCENT)
        self.cell(0, 8, text, ln=True)
        # Thin underline
        x = self.get_x()
        y = self.get_y()
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.4)
        self.line(20, y, 190, y)
        self.set_line_width(0.2)
        self.ln(3)

    # -- Body text -------------------------------------------
    def body(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*TEXT_DARK)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    # -- Bullet list -----------------------------------------
    def bullets(self, items):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*TEXT_DARK)
        for item in items:
            self.set_x(25)
            self.cell(6, 6, chr(149), ln=False)   # bullet char
            self.set_x(31)
            self.multi_cell(0, 6, item)
        self.ln(2)

    # -- Code block ------------------------------------------
    def code_block(self, code_lines, label="Code"):
        self.ln(1)
        self.set_font("Helvetica", "BI", 8)
        self.set_text_color(*TEXT_GREY)
        self.cell(0, 5, label, ln=True)
        self.set_fill_color(24, 24, 34)
        self.set_text_color(200, 200, 210)
        self.set_font("Courier", "", 8.5)
        self.set_draw_color(*BORDER)
        self.set_line_width(0.3)
        total_h = 5.5 * len(code_lines) + 6
        self.rect(20, self.get_y(), 170, total_h, 'FD')
        self.ln(3)
        for line in code_lines:
            self.set_x(23)
            self.cell(0, 5.5, line, ln=True)
        self.ln(3)

    # -- Screenshot ------------------------------------------
    def screenshot(self, img_path, caption="", w=170):
        p = Path(img_path)
        if not p.exists():
            self.body(f"[Screenshot not available: {p.name}]")
            return
        # keep image below current cursor
        if self.get_y() > 230:
            self.add_page()
        x = (210 - w) / 2
        self.image(str(p), x=x, w=w)
        if caption:
            self.set_font("Helvetica", "I", 8)
            self.set_text_color(*TEXT_GREY)
            self.cell(0, 5, f"Figure: {caption}", ln=True, align="C")
        self.ln(4)

    # -- Info table row --------------------------------------
    def info_row(self, label, value):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*TEXT_GREY)
        self.cell(50, 6, label, ln=False)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*TEXT_DARK)
        self.cell(0, 6, value, ln=True)

    # -- Title page ------------------------------------------
    def title_page(self, subtitle, objective):
        self.add_page()
        # big accent bar
        self.set_fill_color(*ACCENT)
        self.rect(0, 14, 210, 2, 'F')
        self.ln(8)

        self.set_font("Helvetica", "B", 28)
        self.set_text_color(*ACCENT)
        self.cell(0, 12, f"Practical {self.practical_num}", ln=True, align="C")

        self.set_font("Helvetica", "B", 16)
        self.set_text_color(*TEXT_DARK)
        self.multi_cell(0, 8, self.practical_title, align="C")
        self.ln(2)

        self.set_font("Helvetica", "", 11)
        self.set_text_color(*TEXT_GREY)
        self.multi_cell(0, 6, subtitle, align="C")
        self.ln(8)

        # Info block
        self.set_fill_color(*LIGHT_BG)
        self.set_draw_color(*BORDER)
        self.rect(30, self.get_y(), 150, 52, 'FD')
        self.set_x(35)
        self.ln(3)
        for label, val in [
            ("Student Name:", "Mantra Patel"),
            ("Student ID:", "24DCS076"),
            ("Course:", "Advanced Web Development Frameworks (ITUE301)"),
            ("Institute:", "DEPSTAR - CHARUSAT"),
            ("Branch / Sem:", "B.Tech CSE - Semester 5"),
            ("Academic Year:", "2025-2026"),
            ("Dev Server Port:", f"http://localhost:{5172 + self.practical_num}"),
        ]:
            self.set_x(35)
            self.info_row(label, val)
        self.ln(6)

        self.set_font("Helvetica", "BI", 10)
        self.set_text_color(*ACCENT)
        self.multi_cell(0, 5, f"Objective: {objective}", align="C")


#                                                
# PRACTICAL 1
#                                                
def build_practical_1():
    pdf = PDF(1, "Introduction to React and Component Architecture")
    pdf.title_page(
        subtitle="Vite + React Student Portfolio with Reusable Component Architecture and Props",
        objective="Set up a modern Vite + React application and construct a student developer portfolio using independently structured, reusable functional components communicating through props."
    )

    # -- Theory -----------------------------------------
    pdf.add_page()
    pdf.section_title("1. Theory & Concepts")
    pdf.body(
        "React is a declarative JavaScript library for building user interfaces through a component-based architecture. "
        "Components are self-contained, reusable units that accept inputs (props) and return JSX describing what the UI should render.\n\n"
        "Key concepts demonstrated in Practical 1:"
    )
    pdf.bullets([
        "Functional Components: Declared with plain JavaScript functions; return JSX markup.",
        "JSX (JavaScript XML): HTML-like syntax embedded in JavaScript, compiled by Vite's Babel/SWC transform.",
        "Props (Properties): Read-only data passed from a parent component to its children. Enforces a single source of truth.",
        "Dynamic Rendering: Using Array.prototype.map() with unique key props to eliminate repeated JSX.",
        "Single Responsibility Principle: Each component does exactly one job (Header displays hero, Skills shows tags, etc.).",
        "Scroll-based Active Section: useEffect registers a scroll listener that updates activeSection state, highlighting the correct NavBar link."
    ])

    # -- Architecture ------------------------------------
    pdf.section_title("2. Component Architecture")
    pdf.code_block([
        "App.jsx (root - declares all data)",
        "  |-- NavBar.jsx     (scroll-based active section highlight)",
        "  |-- Header.jsx     (name prop, themeColor prop, role prop)",
        "  |-- About.jsx      (bio prop)",
        "  |-- Skills.jsx     (skillList array prop -> dynamic .map())",
        "  |-- Projects.jsx   (projects array prop -> 3 cards)",
        "  `-- Footer.jsx     (name prop)",
    ], label="Component Tree")

    pdf.section_title("3. Key Code Snippets")

    pdf.code_block([
        "// Skills.jsx - dynamic rendering from prop array",
        "function Skills({ skillList = [] }) {",
        "  return (",
        "    <section className='skills'>",
        "      <p className='section-heading'>Skills</p>",
        "      <div className='skill-tags'>",
        "        {skillList.map((skill) => (",
        "          <span className='tag' key={skill}>{skill}</span>",
        "        ))}",
        "      </div>",
        "    </section>",
        "  )",
        "}",
    ], label="Skills.jsx - Props Array & Dynamic Rendering")

    pdf.code_block([
        "// Header.jsx - name and themeColor passed as props",
        "function Header({ name, themeColor = '#3b82f6', role }) {",
        "  return (",
        "    <header className='hero'>",
        "      <h1 className='hero-name' style={{ color: themeColor }}>",
        "        {name}",
        "      </h1>",
        "      <p className='hero-role'>{role}</p>",
        "    </header>",
        "  )",
        "}",
    ], label="Header.jsx - Props with Inline Dynamic Styling")

    pdf.code_block([
        "// App.jsx - single source of truth for all data",
        "const studentName   = 'Mantra Patel'",
        "const themeColor    = '#38bdf8'",
        "const technicalSkills = ['HTML5', 'CSS3', 'React.js', 'Node.js', ...]",
        "",
        "<Header name={studentName} themeColor={themeColor} />",
        "<Skills skillList={technicalSkills} />",
    ], label="App.jsx - Props Declaration & Passing")

    # -- Screenshots -------------------------------------
    pdf.section_title("4. Application Screenshots")
    pdf.screenshot(SS / "p1_hero_skills.png", "Practical 1 - Hero Section, About, and Skills tags (Dark Theme)")
    pdf.screenshot(SS / "p1_projects_footer.png", "Practical 1 - Projects Section and Footer")

    # -- Testing -----------------------------------------
    pdf.section_title("5. Testing Checklist")
    pdf.bullets([
        "npm install runs without errors in Practical-1/",
        "npm run dev launches on http://localhost:5173 with strictPort: true",
        "All 6 components render: NavBar, Header, About, Skills, Projects, Footer",
        "Props verified: Changing studentName in App.jsx immediately re-renders Header",
        "Skills array of 12 items rendered dynamically via .map() with unique keys",
        "Projects component displays 3 cards with title, description, tech badges",
        "NavBar active section updates correctly as user scrolls through each section",
        "No console errors or React warnings in browser DevTools",
        "Production build (npm run build) succeeds with 0 TypeScript/Vite errors",
    ])

    # -- Learning Outcomes --------------------------------
    pdf.section_title("6. Learning Outcomes")
    pdf.body(
        "After completing Practical 1, I can:\n"
        "- Configure a modern React development environment using Vite with HMR and ESLint.\n"
        "- Decompose a UI into small, single-responsibility functional components.\n"
        "- Pass data from parent to child components using props without breaking component encapsulation.\n"
        "- Render lists dynamically using Array.map() with proper React key assignment.\n"
        "- Apply inline dynamic styling through props (themeColor -> style={{ color: themeColor }}).\n"
        "- Implement a scroll-aware NavBar using useEffect and addEventListener without memory leaks."
    )

    pdf.output(str(BASE / "Practical-1.pdf"))
    print("[PASS] Practical-1.pdf generated")


#                                                
# PRACTICAL 2
#                                                
def build_practical_2():
    pdf = PDF(2, "State Management and Routing in React")
    pdf.title_page(
        subtitle="Multi-Page SPA Navigation with react-router-dom, useState Hooks, and Controlled Form Inputs",
        objective="Implement client-side multi-page routing using react-router-dom and manage reactive UI state with useState in a student portfolio SPA."
    )

    pdf.add_page()
    pdf.section_title("1. Theory & Concepts")
    pdf.body(
        "Practical 2 extends the portfolio with two core React capabilities:\n"
        "* Client-side Routing (react-router-dom v7): Intercepts anchor clicks, updates the browser History API, "
        "and swaps the rendered component without triggering a server request or full page reload.\n"
        "* useState Hook: Declares a reactive state variable and a setter function. Every setter call triggers React's "
        "virtual DOM reconciliation, updating only the affected DOM nodes."
    )
    pdf.bullets([
        "<BrowserRouter>: Wraps the app in main.jsx to provide routing context across the component tree.",
        "<Routes> / <Route>: Declarative route mapping - path='/' renders Home.jsx, path='*' renders NotFound.jsx (404).",
        "<Link to='/projects'>: Internal navigation anchor that prevents full page reload (replaces <a href='...'>).",
        "useLocation(): Hook returning the current URL path, used by NavBar to apply the .active CSS class.",
        "useState(true) - darkMode: Toggles between .app.dark and .app.light CSS classes on the root div.",
        "useState(false) - showTip: Controls the conditional rendering of the help tooltip in Contact.jsx.",
        "Controlled Inputs: <input value={name} onChange={e => setName(e.target.value)} /> ensures React state is the single source of truth for form data.",
        "Live Character Counter: {message.length} / 250 updates on every keystroke via controlled state."
    ])

    pdf.section_title("2. Routing Architecture")
    pdf.code_block([
        "main.jsx",
        "  `-- <BrowserRouter>",
        "        `-- App.jsx    (manages darkMode state)",
        "              |-- NavBar.jsx   (Link components, active route detection)",
        "              `-- <Routes>",
        "                    |-- Route path='/'         -> Home.jsx",
        "                    |-- Route path='/projects' -> Projects.jsx",
        "                    |-- Route path='/contact'  -> Contact.jsx",
        "                    `-- Route path='*'         -> NotFound.jsx  (404)",
    ], label="Routing Hierarchy")

    pdf.section_title("3. Key Code Snippets")
    pdf.code_block([
        "// App.jsx - useState 1: Dark/Light theme toggle",
        "const [darkMode, setDarkMode] = useState(true)",
        "const toggleTheme = () => setDarkMode(prev => !prev)",
        "",
        "return (",
        "  <div className={darkMode ? 'app dark' : 'app light'}>",
        "    <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />",
        "    ...",
        "  </div>",
        ")",
    ], label="Dark/Light Mode Toggle - useState #1")

    pdf.code_block([
        "// Contact.jsx - Controlled form inputs + useState",
        "const [name, setName]       = useState('')",
        "const [email, setEmail]     = useState('')",
        "const [message, setMessage] = useState('')",
        "const [showTip, setShowTip] = useState(false)  // toggle #2",
        "",
        "<input value={name} onChange={e => setName(e.target.value)} />",
        "<textarea value={message} onChange={e => setMessage(e.target.value)} />",
        "<p>{message.length} / 250 characters</p>   {/* live counter */}",
    ], label="Controlled Inputs & Character Counter - useState #2+")

    pdf.code_block([
        "// NavBar.jsx - Link (not <a>) to prevent page reload",
        "import { Link, useLocation } from 'react-router-dom'",
        "",
        "const location = useLocation()",
        "",
        "<Link to='/' className={location.pathname==='/' ? 'active' : ''}>",
        "  Home",
        "</Link>",
        "<Link to='/contact' className={location.pathname==='/contact' ? 'active' : ''}>",
        "  Contact",
        "</Link>",
    ], label="NavBar.jsx - React Router Link & Active State")

    pdf.section_title("4. Application Screenshots")
    pdf.screenshot(SS / "p2_home_dark.png", "Practical 2 - Home Page (Dark Mode)")
    pdf.screenshot(SS / "p2_home_light.png", "Practical 2 - Home Page (Light Mode after toggle)")
    pdf.screenshot(SS / "p2_projects_page.png", "Practical 2 - Projects page (/projects route, no reload)")
    pdf.screenshot(SS / "p2_contact_controlled_form.png", "Practical 2 - Contact form with live character counter and help tooltip")
    pdf.screenshot(SS / "p2_contact_submitted.png", "Practical 2 - Contact form submitted (state update confirmation)")
    pdf.screenshot(SS / "p2_404_not_found.png", "Practical 2 - 404 Not Found page (wildcard * route)")

    pdf.section_title("5. Testing Checklist")
    pdf.bullets([
        "npm install runs without errors in Practical-2/",
        "npm run dev launches on http://localhost:5174 with strictPort: true",
        "Navigating between /, /projects, and /contact has zero page reload",
        "Visiting /invalid-test-path renders the custom 404 NotFound page",
        "Dark/Light mode toggle smoothly transitions all colour tokens",
        "Contact form inputs are fully controlled: typing updates React state instantly",
        "Live character counter reflects exact message.length on every keystroke",
        "Help tooltip appears/hides correctly via showTip useState toggle",
        "Form submission shows confirmation message and resets all fields after 3 s",
        "Browser console: 0 errors and 0 React key warnings",
    ])

    pdf.section_title("6. Learning Outcomes")
    pdf.body(
        "After completing Practical 2, I can:\n"
        "- Implement client-side routing with react-router-dom using BrowserRouter, Routes, Route, and Link.\n"
        "- Use the useLocation() hook to detect the active route and apply conditional CSS classes.\n"
        "- Manage application-level state with useState and propagate it through props (dark mode).\n"
        "- Build fully controlled form components where React state owns the input value at all times.\n"
        "- Conditionally render JSX elements based on boolean state (help tooltip, confirmation message).\n"
        "- Implement a catch-all 404 route using the * wildcard path in React Router."
    )

    pdf.output(str(BASE / "Practical-2.pdf"))
    print("[PASS] Practical-2.pdf generated")


#                                                
# PRACTICAL 3
#                                                
def build_practical_3():
    pdf = PDF(3, "API Integration and Data Rendering in React")
    pdf.title_page(
        subtitle="GitHub REST API with useEffect, Async State Management, Loading/Error/Success States, Search Filter & Retry",
        objective="Integrate the live GitHub REST API into the portfolio Projects page using useEffect, manage async request lifecycle states, and render dynamic repository data with search filtering and error recovery."
    )

    pdf.add_page()
    pdf.section_title("1. Theory & Concepts")
    pdf.body(
        "Practical 3 introduces asynchronous data fetching into a React application using the Fetch API "
        "and the useEffect lifecycle hook. Data from a REST endpoint is modelled as a three-state machine:\n"
        "  * Loading  - request is in-flight; display a spinner.\n"
        "  * Success  - data received; display the repository grid.\n"
        "  * Error    - request failed; display an error message with a Retry action.\n\n"
        "Separation of concerns is enforced by extracting all HTTP communication into a dedicated "
        "service module (src/services/githubApi.js), keeping Projects.jsx purely as a UI orchestrator."
    )
    pdf.bullets([
        "useEffect(fn, [dep]): Schedules a side-effect after every render where dep changes. Empty [] runs only on mount.",
        "useCallback(fn, [dep]): Memoises the loadRepositories function so useEffect's dependency array is stable and never causes an infinite loop.",
        "GitHub REST API: GET https://api.github.com/users/Mantra-17/repos?sort=updated&per_page=30",
        "Response fields used: name, html_url, description, language, stargazers_count, forks_count, updated_at.",
        "HTTP error classification in githubApi.js: 404 -> user not found, 403 -> rate limit, 5xx -> server error.",
        "Search filter: repos filtered by name, description, and language on every searchTerm keystroke.",
        "Empty state: RepoList renders a friendly 'No repositories found' card when filteredRepos.length === 0.",
        "Demo toggle: simulates a network error on demand so the error state and retry can be demonstrated during viva."
    ])

    pdf.section_title("2. Component & Service Architecture")
    pdf.code_block([
        "src/",
        "  services/",
        "    githubApi.js       <- isolated HTTP module; throws typed errors",
        "  components/",
        "    Spinner.jsx        <- animated ring; role=status for accessibility",
        "    ErrorMessage.jsx   <- error text + Retry callback button",
        "    RepoCard.jsx       <- single repository card (name, URL, stars, lang)",
        "    RepoList.jsx       <- grid of RepoCards + empty state",
        "  pages/",
        "    Projects.jsx       <- state machine: loading/error/success + search",
    ], label="Practical 3 - Module Architecture")

    pdf.section_title("3. Key Code Snippets")
    pdf.code_block([
        "// Projects.jsx - mandatory state + useEffect",
        "const [repos,  setRepos]  = useState([])",
        "const [loading, setLoading] = useState(true)",
        "const [error,  setError]  = useState(null)",
        "const [searchTerm, setSearchTerm] = useState('')",
        "",
        "const loadRepositories = useCallback(async () => {",
        "  setLoading(true); setError(null)",
        "  try {",
        "    const data = await fetchUserRepos('Mantra-17')",
        "    setRepos(data)",
        "  } catch (err) {",
        "    setError(err.message)",
        "  } finally {",
        "    setLoading(false)",
        "  }",
        "}, [simulateError])",
        "",
        "useEffect(() => { loadRepositories() }, [loadRepositories])",
    ], label="Projects.jsx - State Machine with useEffect")

    pdf.code_block([
        "// githubApi.js - dedicated API service",
        "const BASE_URL = 'https://api.github.com/users'",
        "",
        "export async function fetchUserRepos(username = 'Mantra-17') {",
        "  const res = await fetch(`${BASE_URL}/${username}/repos?sort=updated&per_page=30`)",
        "  if (!res.ok) {",
        "    if (res.status === 404) throw new Error(`User not found: ${username}`)",
        "    if (res.status === 403) throw new Error('Rate limit exceeded - wait and retry.')",
        "    throw new Error(`HTTP ${res.status}: ${res.statusText}`)",
        "  }",
        "  return res.json()",
        "}",
    ], label="githubApi.js - Isolated API Service Layer")

    pdf.code_block([
        "// Conditional rendering in Projects.jsx",
        "{loading && <Spinner message='Fetching live repositories...' />}",
        "",
        "{!loading && error && (",
        "  <ErrorMessage message={error} onRetry={loadRepositories} />",
        ")}",
        "",
        "{!loading && !error && (",
        "  <RepoList repos={filteredRepos} searchTerm={searchTerm} />",
        ")}",
    ], label="Conditional UI State Rendering")

    pdf.code_block([
        "// Search / Filter",
        "const filteredRepos = repos.filter(repo =>",
        "  repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||",
        "  (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||",
        "  (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase()))",
        ")",
    ], label="Real-time Repository Search Filter")

    pdf.section_title("4. Application Screenshots")
    pdf.screenshot(SS / "p3_loading_spinner.png", "Practical 3 - Loading State: animated spinner while GitHub API request is in flight")
    pdf.screenshot(SS / "p3_repos_success.png", "Practical 3 - Success State: live repository cards from api.github.com/users/Mantra-17/repos")
    pdf.screenshot(SS / "p3_search_filter.png", "Practical 3 - Search Filter: 'Movie' keyword narrows results in real-time")
    pdf.screenshot(SS / "p3_empty_state.png", "Practical 3 - Empty State: no repos match the search term 'xyznonexistent123'")
    pdf.screenshot(SS / "p3_error_state.png", "Practical 3 - Error State: simulated failure showing ErrorMessage + Retry button")
    pdf.screenshot(SS / "p3_retry_success.png", "Practical 3 - After Retry: repositories successfully reloaded after error recovery")

    pdf.section_title("5. Testing Checklist")
    pdf.bullets([
        "npm install runs without errors in Practical-3/",
        "npm run dev launches on http://localhost:5175 with strictPort: true",
        "GitHub REST API fetches real repos for Mantra-17 on first mount",
        "Loading spinner renders visibly while request is in-flight",
        "Success state displays all repository cards with name, URL, stars, language",
        "Real-time search input instantly filters repo list on every keystroke",
        "Clearing the search restores the full repository list",
        "Typing a non-matching term shows the empty state card (not a blank page)",
        "Error demo toggle triggers the error state without crashing the app",
        "Retry button fires loadRepositories() again and successfully restores repo data",
        "useEffect only runs once on mount (no infinite API request loop)",
        "Browser console: 0 errors, 0 warnings across all three states",
    ])

    pdf.section_title("6. Learning Outcomes")
    pdf.body(
        "After completing Practical 3, I can:\n"
        "- Consume a public REST API using the browser Fetch API inside a React component lifecycle.\n"
        "- Use useEffect with a stable dependency (useCallback) to fetch data once on component mount without infinite loops.\n"
        "- Model asynchronous request state as a three-value machine: loading / error / success.\n"
        "- Implement a try/catch/finally block to correctly transition all three states on every fetch attempt.\n"
        "- Compose specialised, reusable components (Spinner, ErrorMessage, RepoCard, RepoList) from a single data-fetching orchestrator (Projects.jsx).\n"
        "- Separate HTTP concerns into a standalone service module (githubApi.js).\n"
        "- Implement client-side search filtering using Array.filter() and String.includes().\n"
        "- Handle edge cases: HTTP 404/403 status codes, empty result sets, and network failures gracefully."
    )

    pdf.output(str(BASE / "Practical-3.pdf"))
    print("[PASS] Practical-3.pdf generated")


if __name__ == "__main__":
    build_practical_1()
    build_practical_2()
    build_practical_3()
    print("\nAll 3 PDFs generated successfully in:", str(BASE))
