# Portfolio-24DCS076 | Advanced Web Development Frameworks (ITUE301)

**Student Name:** Mantra Patel  
**Student ID:** 24DCS076  
**Class/Branch:** B.Tech Computer Science & Engineering (Semester 5)  
**Institution:** Chandubhai S. Patel Institute of Technology (CSPIT) / Devang Patel Institute of Advance Technology and Research (DEPSTAR), CHARUSAT  
**GitHub Repository:** [https://github.com/Mantra-17/Portfolio-24DCS076.git](https://github.com/Mantra-17/Portfolio-24DCS076.git)

---

## 📌 Repository Overview

This repository houses the laboratory assignments for the **Advanced Web Development Frameworks (ITUE301)** coursework. The architecture is modularized into independently executable practical modules designed to run simultaneously on dedicated ports without port collision.

```text
Portfolio-24DCS076/
├── Practical-1/             # [Port 5173] Introduction to React and Component Architecture
├── Practical-2/             # [Port 5174] State Management and Routing in React
├── Practical-3/             # [Port 5175] API Integration and Data Rendering in React
├── Practical-1.pdf          # Professional Lab Report for Practical 1
├── Practical-2.pdf          # Professional Lab Report for Practical 2
├── Practical-3.pdf          # Professional Lab Report for Practical 3
├── Practical-4/             # (Future) RESTful API with Node.js and Express
├── Practical-5/             # (Future) MongoDB Integration & Mongoose Schema
└── Practical-6/             # (Future) Full Stack Integration
```

---

## 🚀 Independent Port Configurations & Running Commands

Each practical contains its own `package.json`, `vite.config.js`, and dedicated port configuration. You can run all three practicals concurrently in separate terminal tabs:

| Practical | Module Description | Port | Dev Command |
| :--- | :--- | :--- | :--- |
| **Practical 1** | Component Architecture & Props | `5173` | `cd Practical-1 && npm run dev` |
| **Practical 2** | React Router SPA & Controlled Inputs | `5174` | `cd Practical-2 && npm run dev` |
| **Practical 3** | GitHub REST API, Async State, Filter | `5175` | `cd Practical-3 && npm run dev` |

---

## 📖 Practical Summaries

### Practical 1: Introduction to React and Component Architecture
- **Objective:** Establish a Vite + React development environment and build a single-page student portfolio using independently structured, reusable components.
- **Components:** `Header.jsx`, `About.jsx`, `Skills.jsx`, `Projects.jsx`, `Footer.jsx`, `NavBar.jsx`.
- **Key Concepts:** Unidirectional data flow via props, inline style theming, dynamic list mapping with unique keys, active section highlight on scroll.
- **Port:** `http://localhost:5173`
- **Documentation:** See [Practical-1/README.md](./Practical-1/README.md)

### Practical 2: State Management and Routing in React
- **Objective:** Implement client-side routing using `react-router-dom` and reactive local state management with the `useState` hook.
- **Routes:** `/` (Home), `/projects` (Projects), `/contact` (Contact Form), `*` (Custom 404 Page).
- **State Handled:**
  - `darkMode` toggle state governing root theme classes (`.app.dark` / `.app.light`).
  - Controlled form inputs for `name`, `email`, and `message`.
  - Live character counter (`message.length / 250`).
  - Help guide toggle state (`showTip`).
- **Port:** `http://localhost:5174`
- **Documentation:** See [Practical-2/README.md](./Practical-2/README.md)

### Practical 3: API Integration and Data Rendering in React
- **Objective:** Consume the live GitHub REST API (`api.github.com/users/Mantra-17/repos`) to dynamically render real public repositories with full asynchronous state handling.
- **State Machine:**
  - `loading`: Displays circular animated `<Spinner />`.
  - `error`: Catches network/API exceptions and displays `<ErrorMessage />` with a `🔄 Retry Request` action.
  - `success`: Renders `<RepoList />` with repository name, HTML URL, stars count, fork count, language, and descriptions.
- **Supplementary Features:**
  - Live search input that filters repositories in real time by name, language, or topic.
  - Test Error State toggle button for faculty viva demonstrations.
  - Modular API service in `src/services/githubApi.js`.
- **Port:** `http://localhost:5175`
- **Documentation:** See [Practical-3/README.md](./Practical-3/README.md)

---

## 🛠️ Installation & Quickstart

```bash
# Clone the repository
git clone https://github.com/Mantra-17/Portfolio-24DCS076.git
cd Portfolio-24DCS076

# Run Practical 1 (Port 5173)
cd Practical-1 && npm install && npm run dev

# In another terminal: Run Practical 2 (Port 5174)
cd Practical-2 && npm install && npm run dev

# In a third terminal: Run Practical 3 (Port 5175)
cd Practical-3 && npm install && npm run dev
```

---

## 📄 Submission Evidence & Reports

- **Practical 1 Lab Report:** [`Practical-1.pdf`](./Practical-1.pdf)
- **Practical 2 Lab Report:** [`Practical-2.pdf`](./Practical-2.pdf)
- **Practical 3 Lab Report:** [`Practical-3.pdf`](./Practical-3.pdf)
