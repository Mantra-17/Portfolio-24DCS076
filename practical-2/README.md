# Practical 2: State Management and Routing in React

**Course:** Advanced Web Development Frameworks (ITUE301)  
**Student Name:** Mantra Patel  
**Student ID:** 24DCS076  
**Institution:** CHARUSAT - DEPSTAR (CSE)  
**Port:** `5174`  
**GitHub Repository:** [https://github.com/Mantra-17/Portfolio-24DCS076.git](https://github.com/Mantra-17/Portfolio-24DCS076.git)

---

## 1. Objective
To implement reactive state management using React hooks (`useState`) and multi-page single-page application (SPA) client-side navigation using `react-router-dom` in the student portfolio application without full page reloads.

## 2. Theory & Architecture

### Core Concepts Addressed
- **Client-Side Routing:** Managing view changes in the browser using the HTML5 History API rather than requesting new HTML documents from the server.
- **`<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`:** Declarative route mapping and internal link interception to prevent unwanted page refreshes.
- **Reactive State with `useState`:** Local component state variables that trigger selective virtual DOM reconciliation when updated via dispatchers.
- **Controlled Components:** Form input elements whose values are entirely governed by React state via `value` and `onChange` attributes.

### Component & Routing Hierarchy
```text
main.jsx (wraps <App /> with <BrowserRouter>)
 └── App.jsx (manages darkMode state)
      ├── NavBar.jsx (links to routes via <Link>, dark/light toggle)
      ├── Routes:
      │    ├── Route: "/"         → Home.jsx (Header, About, Skills, Footer)
      │    ├── Route: "/projects" → Projects.jsx (Project showcase)
      │    ├── Route: "/contact"  → Contact.jsx (Controlled form, char counter, help toggle)
      │    └── Route: "*"         → NotFound.jsx (404 custom error page)
```

---

## 3. Technologies Used
- **Runtime & Tooling:** Node.js (v18+), Vite 8.x
- **Frontend Framework:** React 19.x
- **Routing:** `react-router-dom` v7.x
- **Styling:** Vanilla CSS3 with dynamic theme variables (`.app.dark` / `.app.light`)
- **Dev Server Port:** 5174 (configured with `strictPort: true`)

---

## 4. Folder Structure
```text
Practical-2/
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
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── NavBar.jsx
    │   └── Skills.jsx
    └── pages/
        ├── Contact.jsx
        ├── Home.jsx
        ├── NotFound.jsx
        └── Projects.jsx
```

---

## 5. Implementation Details

1. **Routing Setup (`main.jsx` & `App.jsx`):**
   - The top-level application is wrapped inside `<BrowserRouter>`.
   - Distinct routes (`/`, `/projects`, `/contact`, and `*`) map to dedicated page components.
   - Internal navigation in `NavBar.jsx` utilizes `<Link to="...">` instead of standard `<a href="...">` to prevent full browser reloads.
2. **State Variable 1 — Dark/Light Mode Toggle (`App.jsx`):**
   - `const [darkMode, setDarkMode] = useState(true)` toggles between `.app.dark` and `.app.light` CSS classes on the root element.
3. **State Variable 2 — UI Help Tooltip Toggle (`Contact.jsx`):**
   - `const [showTip, setShowTip] = useState(false)` conditionally displays submission instructions.
4. **State Variable 3 — Controlled Form Inputs (`Contact.jsx`):**
   - Controlled state for `name`, `email`, and `message` guarantees single-source-of-truth input handling:
     ```jsx
     const [message, setMessage] = useState('')
     <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
     ```
5. **Supplementary — Live Character Counter:**
   - Displays real-time `{message.length} / 250 characters` as user types.
6. **Supplementary — 404 Route (`NotFound.jsx`):**
   - Wildcard path `*` renders a styled 404 error page with a quick link returning to `/`.

---

## 6. How to Install & Run

```bash
# Navigate to the Practical-2 directory
cd Practical-2

# Install dependencies (including react-router-dom)
npm install

# Start Vite development server on port 5174
npm run dev

# Build for production
npm run build
```

Open browser at: `http://localhost:5174`

---

## 7. Testing Performed & Verification Checklist

- [x] Application bootstraps cleanly on `http://localhost:5174`.
- [x] Navigation between `/`, `/projects`, and `/contact` happens instantaneously with zero page reload.
- [x] Visiting any unknown URL (e.g., `http://localhost:5174/invalid-route`) gracefully displays the custom 404 page.
- [x] Dark/Light mode toggle smoothly alternates background, card, and text colors.
- [x] Contact form inputs are fully controlled; typing updates React state instantaneously.
- [x] Live character counter dynamically updates and indicates remaining character capacity.
- [x] Form submission displays confirmation alert and clears fields.
- [x] Browser DevTools console clean with 0 warnings/errors.
