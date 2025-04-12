# E2E Test Assignment

This project is an end-to-end (E2E) test suite built using [Playwright](https://playwright.dev/) with TypeScript for testing key user flows on a sample staging platform.

---

## ✅ Project Overview

The goal of this assignment was to:
- Set up a Playwright project with TypeScript
- Write meaningful E2E tests that cover UI interaction and validations
- Use a `.env` configuration for flexibility
- Ensure tests are runnable via simple CLI commands

---

## 📁 Project Structure

```
e2e-test-assignment/
├── pages/                  # Page Object Models for reusable selectors & actions
│   ├── ContactPage.ts
│   ├── LoginPage.ts
│   └── PurchasePage.ts
├── tests/                  # All Playwright test specs
│   ├── contact.spec.ts
│   ├── login.spec.ts
│   └── purchase.spec.ts
├── utils/                  # Utility functions and helpers
│   ├── auth.ts
│   ├── config.ts
│   └── helpers.ts
├── .env                    # Base URL environment variable
├── playwright.config.ts   # Playwright configuration file
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v20 or later recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Install dependencies

```bash
pnpm install
```

## 🌱 Environment Setup

This project uses a `.env` file to store environment-specific variables for flexibility and ease of configuration.

---

### 📄 Setup Instructions

1. **Copy the example environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Open the newly created `.env` file** and update the `BASE_URL` with the URL of your own test or staging environment:

   ```env
   BASE_URL=https://your-staging-url.com/dashboard
   ```

---

### 📌 Important Note

> 🛑 **The original staging environment URL and company details have been intentionally anonymized for privacy reasons.**  
>  
> If you’d like more context about the original setup or have any questions, feel free to reach out — I’d be happy to chat!



## 🚀 Running Tests

### Run all tests

```bash
pnpm pw
```

### Run tests in UI mode

```bash
pnpm pw:ui
```

### Run tests with debug mode

```bash
pnpm pw:debug
```

### Show HTML report after tests

```bash
pnpm pw:report
```

---

## 🧪 Test Scenarios

### Login
- Valid login scenario using provided credentials.

### Contact
- Contact form input validation.
- Successful contact creation.

### Purchase
- Placeholder test file for future purchase-related tests.

---

## 📦 Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📌 Notes

- No GitHub Action is included as per assignment instructions.
- The suite uses Page Object Model (POM) for better maintainability.
- Easily extendable with new test cases and pages.

---

## 📤 Submission

Clone, install, and run the tests with one command:

```bash
pnpm install && pnpm pw
```
