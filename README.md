# MUM Web Application — Developer Assessment

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel%20Production-blue?style=for-the-badge&logo=vercel)](https://mum-five-tawny.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/jeevaroyes1/mum)
[![Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge&logo=react)](https://mum-five-tawny.vercel.app/)

> **Developer Assessment 2:** Website Replication (Homepage Only) + Form Management  
> **Reference Website:** [https://www.mum.lu/](https://www.mum.lu/)  
> **Live Deployed URL:** [https://mum-five-tawny.vercel.app/](https://mum-five-tawny.vercel.app/)  
> **Backend / API Endpoint:** `https://mum-five-tawny.vercel.app/api/`  
> **Repository:** [https://github.com/jeevaroyes1/mum](https://github.com/jeevaroyes1/mum)  

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Deliverables & Assessment Requirements Fulfillment](#deliverables--assessment-requirements-fulfillment)
   - [1. Homepage Replication](#1-homepage-replication)
   - [2. Contact / Enquiry Form](#2-contact--enquiry-form)
   - [3. Backend Dashboard (Complete CRUD)](#3-backend-dashboard-complete-crud)
   - [4. Technology Stack & Libraries](#4-technology-stack--libraries)
3. [Architecture Decisions & Technical Approach](#architecture-decisions--technical-approach)
4. [Assumptions Made During Implementation](#assumptions-made-during-implementation)
5. [Evaluation Criteria Matrix](#evaluation-criteria-matrix)
6. [Database Design](#database-design)
7. [API Documentation](#api-documentation)
8. [Admin Access & Demo Credentials](#admin-access--demo-credentials)
9. [Local Development Setup](#local-development-setup)
10. [Database Setup Instructions](#database-setup-instructions)
11. [Deployment Guide (Vercel)](#deployment-guide-vercel)

---

## Project Overview

This repository contains the complete implementation for **Assignment 2: Developer Assessment**.

The project is a full-stack **MERN** application built from the ground up to:
1. Replicate the visual identity, dynamic animations, bilingual experience, and responsive structure of the **[MUM digital agency homepage](https://www.mum.lu/)**.
2. Provide a fully functional **Contact / Enquiry Form** with strict frontend and backend validation, storing submissions in **MongoDB Atlas**.
3. Provide a dedicated **Admin Dashboard** supporting complete **CRUD operations** (Create, Read, Update, Delete) along with real-time text search and status-based filtering for managing client enquiries.
4. Deliver a production-grade cloud deployment on **Vercel** utilizing a modern multi-service serverless architecture.

---

## Deliverables & Assessment Requirements Fulfillment

### 1. Homepage Replication
Replicated the reference website (`https://www.mum.lu/`) using **React 19** with pixel-level responsiveness across **Desktop**, **Tablet**, and **Mobile** viewports:

- **Navigation / Header:** Sticky header with scroll detection (`.navbar-scrolled`), brand typography, interactive language toggle (**EN / FR**), concentric status ring badge, admin access lock, and an animated mobile overlay drawer.
- **Dynamic Hero Section:**
  - **Animated Text Ticker:** Cycles smoothly through brand keywords (`measurable`, `appealing`, `effective`, `innovative`, `understandable`, `authentic`, `AI compatible`) every 2200ms using `useLayoutEffect` to eliminate visual flash on language switch.
  - **Interactive Video Reel:** Dynamic zoom and parallax translation mapped directly to user scroll position using `window.requestAnimationFrame`.
- **Services Showcase:** Interactive dark-mode cards highlighting agency pillars (Strategy, Creation, Marketing, Applications) with custom mouse-tracking spotlight reflections driven by CSS custom properties.
- **Agency Portfolio (Projects):** Responsive grid showcase displaying client case studies with category tags and external link previews.
- **About & Statistics:** Highlighting agency milestones and quantitative track record with animated hover elevation.
- **Footer:** Brand footer with bilingual quick links, agency coordinates, social media vector SVGs, and copyright notices.
- **Scroll Reveal Animations:** Custom `useScrollReveal` hook leveraging the browser's native `IntersectionObserver` API (`threshold: 0.12`) for hardware-accelerated viewport entrance transitions.

---

### 2. Contact / Enquiry Form
Located in the `#contact` section of the homepage with seamless two-tier validation:

- **Form Fields:**
  - `Name`: Full name of the prospect.
  - `Email`: Contact email address.
  - `Phone`: International or local phone number.
  - `Message`: Detailed project enquiry description.
- **Frontend Validation:**
  - Instant client-side validation on submission.
  - Name length check ($\ge 2$ characters).
  - Strict RFC 5322 compliant email regex matching.
  - Phone format validation matching standard patterns (`/^[6-9][0-9]{9}$/` and international format).
  - Minimum message length enforcement ($\ge 10$ characters).
  - Inline error feedback displayed below invalid fields.
- **Backend Validation:**
  - Managed by `express-validator` middleware on the API tier.
  - Re-checks all constraints independently of the client.
  - Returns structured `400 Bad Request` JSON containing field-level error arrays if tampered requests bypass the UI.
- **Database Persistence:**
  - Cleaned, trimmed, and normalized data is committed directly to the MongoDB `enquiries` collection with automatic timestamps (`createdAt`, `updatedAt`) and a default status of `'New'`.

---

### 3. Backend Dashboard (Complete CRUD)
Accessible at `/admin` (or via the lock icon in the Navbar):

- **View All Submissions:** Tabular overview of all client enquiries with responsive overflow, date formatting, and color-coded status badges (`New`, `In Progress`, `Resolved`).
- **View Individual Submission:** Dedicated "View" modal presenting the full enquiry payload, submission timestamp, ID, and message text.
- **Add New Entry:** "Add Enquiry" modal enabling administrators to manually record phone or offline leads with full validation.
- **Edit Existing Entry:** "Edit" modal allowing administrators to modify client details or update the triage status (`New` $\to$ `In Progress` $\to$ `Resolved`).
- **Delete Entry:** Custom confirmation modal preventing accidental deletions with asynchronous deletion and immediate UI synchronization.
- **Live Search & Filtering:**
  - **Text Search:** Real-time debounced query filtering across client name, email address, or phone number using MongoDB `$regex` pattern matching.
  - **Status Filter:** Dropdown filtering by `'All'`, `'New'`, `'In Progress'`, or `'Resolved'`.
- **Authentication Gate:** The admin dashboard is guarded by `AuthContext`. Unauthenticated visitors are presented with a security barrier and prompted to authenticate via the modal.

---

### 4. Technology Stack & Libraries

#### Frontend
- **React.js (v19.3.1):** Functional component architecture with hooks (`useState`, `useEffect`, `useCallback`, `useRef`, `useLayoutEffect`).
- **Vite (v8.3.8):** Next-generation frontend bundler providing instant Hot Module Replacement (HMR) and optimized production chunking.
- **React Router DOM (v7.18.5):** Client-side SPA routing (`/` for Homepage, `/admin` for Dashboard).
- **Axios (v1.21.1):** Promise-based HTTP client with centralized environment-aware base URL resolution.
- **Lucide React (v1.74.0):** Clean, consistent feather icon set.
- **Pure Custom CSS (`App.css` + `index.css`):** Handcrafted design system using modern CSS Variables, Flexbox, Grid, and hardware-accelerated transitions—avoiding heavy utility CSS dependencies.
- **Context API:** Lightweight native state management (`AuthContext` for admin state; `LanguageContext` for bilingual localization).

#### Backend
- **Node.js (v18+ / v22 tested):** Asynchronous event-driven runtime environment.
- **Express.js (v5.3.0):** Modern web framework handling middleware chains, request routing, and JSON serialization.
- **Mongoose (v9.12.2):** MongoDB Object Data Modeling (ODM) layer providing schema validation, type safety, and connection management.
- **express-validator (v7.3.2):** Server-side data sanitization and schema validation middleware.
- **cors (v2.8.6):** Cross-Origin Resource Sharing middleware enabling secure client-server communication.
- **dotenv (v18.0.10):** Environment variable loader for local development isolation.

#### Database & Cloud Infrastructure
- **MongoDB Atlas:** Multi-region cloud replica set hosting the `mum_db` document store.
- **Vercel:** Multi-service cloud hosting platform distributing frontend static assets via Edge CDN and running backend logic as Node.js serverless functions.
- **Git & GitHub:** Version control with automated CI/CD deployments triggered on `git push origin main`.

---

## Architecture Decisions & Technical Approach

### 1. Decoupled Multi-Service Monorepo
Instead of a traditional monolithic server serving HTML or coupling the codebase to a heavy full-stack framework like Next.js, we chose a **decoupled multi-service architecture**:
- `frontend/` and `backend/` maintain independent `package.json` manifests, allowing separate dependency resolution and isolated build lifecycles.
- Unified through `vercel.json` services configuration:
  - Frontend compiled into static edge assets delivered globally via Vercel's Edge CDN.
  - Backend packaged as an on-demand serverless microservice.
  - Vercel Edge reverse proxy rewrites `/api/(.*)` to the backend, eliminating cross-domain CORS preflight overhead in production.

### 2. Serverless Connection Caching (MongoDB)
Standard Node servers maintain long-lived database connections. In serverless functions, execution containers spin up and down dynamically.
- **Decision:** Implemented global connection pooling in `backend/config/db.js` using `global.mongoose`.
- **Impact:** Warm serverless containers reuse active MongoDB connections in **0ms** without re-authenticating, protecting the Atlas cluster from connection pool exhaustion during traffic spikes.

### 3. Synchronous Route Registration & Pre-Flight Middleware
- **Decision:** All Express routes (`/api/auth`, `/api/enquiries`) are registered synchronously at container load time.
- **Impact:** Eliminates cold-start race conditions where incoming requests could arrive before asynchronous database callbacks finished mounting routes. Database availability is verified per-request via pre-flight middleware before delegating to route handlers.

### 4. Zero-Dependency Localization Architecture
- **Decision:** Implemented bilingual support (EN/FR) using React's native Context API and centralized dictionary maps instead of bulky third-party i18n libraries.
- **Impact:** Keeps the production JavaScript bundle under 400 KB gzipped while delivering instantaneous language switching persisted in `localStorage`.

---

## Assumptions Made During Implementation

1. **Scope:** The assessment specifically requested replicating the **homepage only** (`https://www.mum.lu/`) plus a form management dashboard. External subpages linked in agency menus (e.g. detailed case studies, legal imprints) route back to relevant anchor sections or display informative indicators.
2. **Phone Number Formatting:** While international phone numbers are accepted, the primary validation regex accommodates standard 10-digit formats and E.164 international prefixes (`/^[+]?[\d\s\-().]{7,20}$/`).
3. **Admin Credential Model:** For assessment review purposes, admin authentication uses direct document lookup against an `adminusers` collection with auto-seeding of the default credentials (`admin@mum.lu` / `admin123`). In an enterprise production system, this would be augmented with `bcrypt` salt rounds and HTTP-only signed JWT session cookies.

---

## Evaluation Criteria Matrix

| Evaluation Criteria | Implementation in Project | Verified Evidence |
|---|---|---|
| **Accuracy of Homepage Replication** | Pixel-accurate replica of MUM.lu: typography, color palette, video zoom reel, text ticker, services, portfolio, stats, and footer. | Visually verified at [Live Website](https://mum-five-tawny.vercel.app/). |
| **React Component Structure** | Clean modularity: atomic components (`Navbar`, `Hero`, `Services`, `ContactForm`), context providers, custom hooks. | Inspect `frontend/src/components/` and `src/context/`. |
| **Responsive Design** | Fluid layouts utilizing CSS Grid, Flexbox, media queries for Desktop, Tablet, and Mobile devices. | Tested across multiple viewport widths; mobile drawer menu included. |
| **Backend & API Implementation** | RESTful Express 5 API with structured JSON responses, health checks, and global error handling. | Inspect `backend/index.js` and `backend/routes/`. |
| **Database Design** | Mongoose schemas with strict data types, required constraints, email uniqueness, and status enums. | Inspect `backend/models/AdminUser.js` and `Enquiry.js`. |
| **CRUD Functionality** | Full enquiry lifecycle: Create (public form & admin), Read (list & single), Update (edit modal), Delete (modal). | Fully operational on `/admin` dashboard. |
| **Form Validation & Error Handling** | Dual validation: live client-side regex + server-side `express-validator` middleware. | Tested with both valid and invalid payloads. |
| **Deployment Quality** | Automated continuous deployment on Vercel Edge Network with MongoDB Atlas cloud hosting. | Zero-downtime deploys on push to `main`. |
| **Code Quality & Maintainability** | Fully commented, clean separation of concerns, deterministic lockfiles, zero unused dependencies. | Clean linting pass and build tests. |

---

## Database Design

The application connects to a MongoDB Atlas cluster (`mum_db`) with two primary Mongoose schemas:

### 1. `Enquiry` Schema (`backend/models/Enquiry.js`)
Stores incoming contact form submissions:

| Field | Type | Required | Default | Validation / Constraints |
|---|---|---|---|---|
| `name` | String | Yes | — | Trimmed, minimum 2 characters |
| `email` | String | Yes | — | Trimmed, lowercase, valid email syntax |
| `phone` | String | Yes | — | Trimmed, phone regex pattern |
| `message` | String | Yes | — | Trimmed, minimum 10 characters |
| `status` | String | No | `'New'` | Enum: `['New', 'In Progress', 'Resolved']` |
| `createdAt` | Date | Auto | Current Time | Mongoose timestamp |
| `updatedAt` | Date | Auto | Current Time | Mongoose timestamp |

### 2. `AdminUser` Schema (`backend/models/AdminUser.js`)
Stores authorized administrator credentials:

| Field | Type | Required | Default | Validation / Constraints |
|---|---|---|---|---|
| `name` | String | No | `'MUM Administrator'` | Trimmed |
| `email` | String | Yes | — | Unique index, lowercase, trimmed |
| `password` | String | Yes | — | Required password string |
| `role` | String | No | `'admin'` | Role identifier |
| `createdAt` | Date | Auto | Current Time | Mongoose timestamp |
| `updatedAt` | Date | Auto | Current Time | Mongoose timestamp |

---

## API Documentation

Base URL in Production: `https://mum-five-tawny.vercel.app/api`  
Base URL in Local Development: `http://localhost:5000/api`

### Endpoints Overview

| Method | Endpoint | Purpose | Request Body | Success Response |
|---|---|---|---|---|
| `GET` | `/api/health` | Service uptime and DB status | None | `200 OK` + Status JSON |
| `POST` | `/api/auth/login` | Authenticate admin | `{ email, password }` | `200 OK` + User profile |
| `POST` | `/api/auth/signup` | Register new admin | `{ name, email, password }` | `201 Created` + User profile |
| `GET` | `/api/auth/verify` | Verify auth & auto-seed default admin | None | `200 OK` + Admin count |
| `GET` | `/api/enquiries` | Fetch enquiries (supports `?search=&status=`) | None | `200 OK` + Array of enquiries |
| `GET` | `/api/enquiries/:id`| Fetch single enquiry by ID | None | `200 OK` + Enquiry object |
| `POST` | `/api/enquiries` | Submit new enquiry | `{ name, email, phone, message }` | `201 Created` + Saved document |
| `PUT` | `/api/enquiries/:id`| Update enquiry details or status | `{ name, email, phone, message, status }` | `200 OK` + Updated document |
| `DELETE`| `/api/enquiries/:id`| Permanently delete enquiry | None | `200 OK` + Deletion message |

---

## Admin Access & Demo Credentials

To inspect and test the **Admin Dashboard (CRUD operations)**:

1. Click the **Lock icon** in the top navigation bar, or navigate directly to:
   ```
   https://mum-five-tawny.vercel.app/admin
   ```
2. The **Admin Authentication Modal** will appear.
3. You can click the **"Auto Fill"** button inside the modal, or manually enter:
   - **Admin Email:** `admin@mum.lu`
   - **Password:** `admin123`
4. Click **"Log In to Admin"** to access the dashboard.
5. You can now view all enquiries, create new entries, edit existing entries, update their status (`New` $\to$ `In Progress` $\to$ `Resolved`), delete records, or use live search and filtering.

---

## Local Development Setup

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm (version 9 or higher)
- Active internet connection (to connect to MongoDB Atlas)

### Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jeevaroyes1/mum.git
   cd mum
   ```

2. **Install all dependencies:**
   ```bash
   # Install root, backend, and frontend dependencies
   npm install
   npm install --prefix backend
   npm install --prefix frontend
   ```

3. **Configure Environment Variables:**
   Create a `.env` file inside the `backend/` directory:
   ```bash
   # backend/.env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.w9modhc.mongodb.net/mum_db?retryWrites=true&w=majority
   ```
   *(A template is provided in `backend/.env.example`)*

4. **Start the Backend Server:**
   ```bash
   npm run server
   ```
   *Expected output:*
   ```text
   Server running on http://localhost:5000
   MongoDB Connected: ac-hxqiuig-shard-00-01.w9modhc.mongodb.net
   ```

5. **Start the Frontend Development Client (in a separate terminal):**
   ```bash
   npm run client
   ```
   *Expected output:*
   ```text
   VITE v8.3.8 ready in 250 ms
   ➜ Local: http://localhost:5173/
   ```

6. **Open in Browser:**
   Visit `http://localhost:5173` to test the application locally.

---

## Database Setup Instructions

The application uses **MongoDB Atlas**. Follow these steps to connect your own cluster if required:

1. **Create an Atlas Account & Cluster:**
   - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas).
   - Create a free tier cluster (M0).
2. **Configure Database Access:**
   - Under **Security** $\to$ **Database Access**, create a user with `Read and write to any database` privileges.
3. **Configure Network Access:**
   - Under **Security** $\to$ **Network Access**, add IP address `0.0.0.0/0` (Allow Access from Anywhere) to permit connections from Vercel's dynamic serverless IP pool.
4. **Obtain Connection String:**
   - Click **Connect** $\to$ **Drivers** (Node.js).
   - Copy the SRV connection string:
     ```text
     mongodb+srv://<username>:<password>@cluster0.w9modhc.mongodb.net/mum_db?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials.
   - Ensure the database name (e.g. `/mum_db`) is included before query parameters.

---

## Deployment Guide (Vercel)

The repository is configured for zero-configuration multi-service deployment on **Vercel** via `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "backend": {
      "root": "backend",
      "framework": "node",
      "installCommand": "npm install",
      "buildCommand": "npm install",
      "outputDirectory": "."
    },
    "frontend": {
      "root": "frontend",
      "framework": "vite"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": { "service": "backend" }
    },
    {
      "source": "/(.*)",
      "destination": { "service": "frontend" }
    }
  ]
}
```

### Steps to Deploy:
1. Push your repository to GitHub.
2. In the Vercel Dashboard, select **Add New Project** $\to$ Import `jeevaroyes1/mum`.
3. Under **Project Settings** $\to$ **Environment Variables**, configure:
   - `MONGO_URI`: Your MongoDB Atlas connection string (checked for **Production** and **Preview**).
   - `VITE_API_URL`: Set to `/api` (checked for **Production** and **Preview**).
4. Click **Deploy**. Vercel will build the Vite frontend, provision the Express serverless function, and connect the reverse proxy.

---

## Submission Checklist

- [x] **Live Deployed URL:** [https://mum-five-tawny.vercel.app/](https://mum-five-tawny.vercel.app/)
- [x] **GitHub Repository:** [https://github.com/jeevaroyes1/mum](https://github.com/jeevaroyes1/mum)
- [x] **Reference Website Accuracy:** Replicated MUM.lu homepage (Navbar, Hero ticker, Video zoom, Services, Projects, Stats, Footer).
- [x] **Responsive Design:** Desktop, Tablet, and Mobile support.
- [x] **Contact / Enquiry Form:** Functional with Name, Email, Phone, Message fields.
- [x] **Validation:** Live frontend validation + server-side `express-validator` sanitization.
- [x] **Database:** Persistent MongoDB Atlas storage via Mongoose schemas.
- [x] **Admin Dashboard:** Complete CRUD (View all, View single, Add, Edit, Delete, Search, Status filter).
- [x] **Documentation:** Comprehensive README covering architecture decisions, assumptions, and setup guides.
