# Practical 1: Introduction to React and Component Architecture

**Course:** Advanced Web Development Frameworks (ITUE301)  
**Student Name:** Mantra Patel  
**Student ID:** 24DCS076  
**Institution:** CHARUSAT - DEPSTAR (CSE)  
**Port:** `5173`  
**GitHub Repository:** [https://github.com/Mantra-17/Portfolio-24DCS076.git](https://github.com/Mantra-17/Portfolio-24DCS076.git)

---

## 1. Objective
To set up a modern React development environment using Vite and construct a responsive student developer portfolio application composed of independently structured, reusable functional components communicating via props.

## 2. Theory & Architecture

### Core Concepts Addressed
- **Component-Based UI Architecture:** Deconstructing user interfaces into modular, self-contained components with single responsibilities.
- **JSX (JavaScript XML):** Declarative syntax combining HTML structure with dynamic JavaScript expressions.
- **Unidirectional Data Flow via Props:** Data originates in the root component (`App.jsx`) and flows downward to child components (`Header`, `About`, `Skills`, `Projects`, `Footer`) as read-only properties.
- **Dynamic List Rendering:** Using JavaScript array methods (`.map()`) with unique `key` props to dynamically render arrays without code duplication.

### Component Hierarchy
```text
App.jsx
 ├── NavBar.jsx      (Supplementary: active section detection & navigation)
 ├── Header.jsx      (Mandatory: displays student name, role, custom themeColor prop)
 ├── About.jsx       (Mandatory: bio summary received via bio prop)
 ├── Skills.jsx      (Mandatory: dynamic skill badge list via skillList array prop)
 ├── Projects.jsx    (Supplementary: 3 featured project cards via projects prop)
 └── Footer.jsx      (Mandatory: contact links & copyright)
```

---

## 3. Technologies Used
- **Runtime & Tooling:** Node.js (v18+), Vite 8.x
- **Frontend Framework:** React 19.x (Functional Components, Hooks)
- **Styling:** Vanilla CSS3 with Modern Theme Tokens, Glassmorphism, Responsive Grid/Flexbox
- **Dev Server Port:** 5173 (configured with `strictPort: true`)

---

## 4. Folder Structure
```text
Practical-1/
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
    └── components/
        ├── About.jsx
        ├── Footer.jsx
        ├── Header.jsx
        ├── NavBar.jsx
        ├── Projects.jsx
        └── Skills.jsx
```

---

## 5. Implementation Details

1. **Header Component (`Header.jsx`):**
   - Receives `name`, `themeColor`, and `role` props from `App.jsx`.
   - Demonstrates dynamic inline styles: `style={{ color: themeColor }}`.
2. **About Component (`About.jsx`):**
   - Receives student biography text via the `bio` prop.
3. **Skills Component (`Skills.jsx`):**
   - Receives `skillList` array prop.
   - Maps over the array dynamically rendering `<span className="tag" key={skill}>{skill}</span>`.
4. **Projects Component (`Projects.jsx`):**
   - Receives an array of project objects (`title`, `desc`, `tech`) via props and renders responsive cards.
5. **NavBar Component (`NavBar.jsx`):**
   - Supplementary requirement: listens to scroll events and highlights the active section in real time.
6. **Footer Component (`Footer.jsx`):**
   - Receives author and contact information props.

---

## 6. How to Install & Run

```bash
# Navigate to the Practical-1 directory
cd Practical-1

# Install dependencies
npm install

# Start Vite development server on port 5173
npm run dev

# Build for production
npm run build
```

Open browser at: `http://localhost:5173`

---

## 7. Testing Performed & Verification Checklist

- [x] Application bootstraps cleanly on `http://localhost:5173`.
- [x] All 5 core components render independently without layout shift.
- [x] Props verified: changing `studentName` or `themeColor` in `App.jsx` immediately re-renders child components.
- [x] Dynamic `.map()` renders all 12 technical skills with unique keys and zero console warnings.
- [x] Projects component displays at least 3 cards with technology tags.
- [x] Navigation bar highlights the active section during scrolling.
- [x] Clean browser DevTools console with 0 errors and 0 warnings.
