# 🚀 Playwright End-to-End Test Automation Framework

A **robust**, **scalable**, and **modular** automation framework built using `Playwright` and `TypeScript`.
Designed as a **ready-to-clone base project** for client deliveries, it includes all standard configurations, reporting, and CI/CD readiness — just plug in your test cases and deliver.

---

## 🔑 Key Features

- ✅ Built using **Playwright + TypeScript + Page Object Model (POM)**
- ⚙️ Clean & modular structure — ready for reuse in multiple projects
- 📂 Centralized locators, constants, and test data
- 🧱 Environment-independent — works on Windows, macOS, and Linux
- 🧪 Supports tagging (@smoke, @functional, @regression)
- 📊 Pre-integrated with **HTML, JUnit, and Allure reports**
- 💾 Git-ready — includes `.gitignore`, `.gitattributes`, `.editorconfig`, and `.vscode` settings
- 🧰 Ready for CI/CD setup (Jenkins, GitHub Actions, etc.)
- 🧹 Standardized cleanup and report generation scripts

---

## 🧩 Folder Structure

```
playwright-portfolio/
├── .vscode/                     # Editor configuration
│   └── settings.json
├── pages/                       # Page Object Models
│   ├── basePage.ts
│   └── common/
│       │── login/
│       │     └── page.ts
│       │     └── locators.ts
│       └── module-{n}/
│             └── page.ts
│             └── locators.ts
├── tests/                       # All test cases
│   └── login-auth.setup.ts
│   └── module-{n}/
│          └── test1.spec.ts
│          └── test2.spec.ts
├── utils/                       # Constants, test data, and helpers
│   ├── constants.ts
│   └── testData.ts
├── fixtures.ts                  # Custom fixtures for pages
├── playwright.config.ts         # Main Playwright configuration
├── package.json                 # Dependencies & scripts
├── .gitignore                   # Ignored files and folders
├── .gitattributes               # Cross-OS consistency
├── .editorconfig                # Formatting and style rules
├── README.md                    # Documentation
└── node_modules/                # Auto-generated after installation
```

---

## ⚙️ Local Setup Guide

### 1️⃣ **Prerequisites**

Ensure the following are installed:

| Tool | Version | Download |
|------|----------|-----------|
| **Node.js** | ≥ 18.x | [https://nodejs.org](https://nodejs.org) |
| **npm** | ≥ 9.x | Comes with Node.js |
| **Git** | Latest | [https://git-scm.com](https://git-scm.com) |
| **VS Code (Recommended)** | Latest | [https://code.visualstudio.com](https://code.visualstudio.com) |

> 💡 *To verify installation:*
```bash
node -v
npm -v
git --version
```

---

### 2️⃣ **Clone and Install**

```bash
# Clone the repository
git clone <repo-url>

# Move into the project folder
cd playwright-portfolio

# Install dependencies
npm install
```

---

### 3️⃣ **Run Tests**

```bash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run functional tests
npm run test:functional

# Run regression tests
npm run test:regression
```

---

### 4️⃣ **View Reports**

```bash
# Playwright HTML report
npm run report:playwright

# Allure report (generate + open)
npm run report:allure
```

---

### 5️⃣ **Clean Reports & Cache**

```bash
# Clean only Allure reports
npm run clean:allure

# Clean everything (reports, cache, node_modules, etc.)
npm run clean:all
```

---

## 🧱 Framework Benefits

| Benefit | Description |
|----------|-------------|
| **Reusability** | Acts as a plug-and-play base for any UI project. Just add pages and test cases. |
| **Scalability** | Supports tagging, modular pages, and multiple environments. |
| **Cross-OS Ready** | Includes `.gitattributes` and `.editorconfig` for consistent behavior across systems. |
| **Team-friendly** | New members can start instantly by following setup steps. |
| **CI/CD Friendly** | Fully compatible with Jenkins, GitHub Actions, and other tools. |
| **Standardization** | Uniform naming conventions, file structure, and reporting. |

---

## 👥 Onboarding for New Members

Any new team member can follow these steps:

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Run `npm install` to set up all dependencies.
3. Explore `pages/` and `tests/` folders for examples.
4. To add new test cases:
   - Create a new Page Object under `pages/`
   - Create test specs under `tests/`
   - Use `@smoke`, `@functional`, or `@regression` tags as needed.
5. Use `npm run test:<tag>` commands to run specific suites.

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Test Runner | Playwright |
| Language | TypeScript |
| Design Pattern | Page Object Model (POM) |
| Reporting | Playwright HTML, Allure, JUnit |
| CI/CD Ready | Jenkins, GitHub Actions |
| Editor | VS Code |

---

## 🛠 Scripts Summary

| Command | Description |
|----------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run all tests in headed mode |
| `npm run test:smoke` | Run only smoke suite |
| `npm run test:functional` | Run functional suite |
| `npm run test:regression` | Run regression suite |
| `npm run report:playwright` | View Playwright report |
| `npm run report:allure` | Generate + open Allure report |
| `npm run clean:allure` | Clean Allure files |
| `npm run clean:all` | Clean all cache, reports, and node_modules |

---

## 🧩 Best Practices

- Follow consistent naming for pages and locators.
- Never use `expect()` inside Page Object files — only inside tests.
- Keep test data and constants in `utils/`.
- Commit only necessary files — reports, cache, and node_modules are ignored by default.
- Always ensure your tests are idempotent (re-runnable).

---

## 📄 License

This framework is licensed under the [MIT License](./LICENSE).
You are free to reuse and adapt it for your client projects.

---

## 💬 Support

If you face setup issues or want to extend it with CI/CD integration,
refer to the included structure and commands, or contact your project maintainer.

---

✨ **Now your framework is fully ready as a plug-and-play template for all client automation projects!**
