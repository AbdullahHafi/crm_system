# 🚀 CRM Pro — Full-Stack CRM Lead Management System

A modern, full-stack **Customer Relationship Management (CRM)** application built for a small sales team. It enables users to manage sales leads, track their progress through a sales pipeline, add internal notes, and view a real-time dashboard — all behind a secure, authenticated interface.

---

## 📋 Project Overview

CRM Pro is a web application designed to streamline the lead management workflow for sales teams. The app provides:

- A **secure login system** so only authenticated users can access the CRM.
- A **dashboard** with a bird's-eye view of the sales pipeline, including lead counts by status and total deal values.
- Full **CRUD operations** on leads (Create, Read, Update, Delete).
- The ability to **add timestamped notes** to any lead for internal communication.
- **Search and filtering** capabilities to quickly find leads by name, company, email, status, source, or assigned salesperson.

---

## 🛠️ Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| **Frontend** | React 18 (Vite), React Router v6, Tailwind CSS 3, Axios, Lucide React     |
| **Backend**  | Node.js, Express.js, JSON Web Tokens (JWT), bcryptjs                       |
| **Database** | Supabase (PostgreSQL) — managed cloud database with REST API               |
| **Styling**  | Tailwind CSS with Inter (Google Font), modern glassmorphism & gradient UI   |

---

## ✨ Features Implemented

### Core Features
- ✅ **Authentication** — Email/password login with JWT tokens. Protected routes prevent unauthenticated access.
- ✅ **Lead Management (CRUD)** — Create, view, edit, delete, and update lead status.
- ✅ **Lead Notes** — Add internal notes to any lead with timestamps and author tracking.
- ✅ **Dashboard** — Real-time stats: Total Leads, New, Qualified, Won, Lost, Total Pipeline Value, Total Won Value.
- ✅ **Search & Filtering** — Filter leads by Status, Lead Source, and Assigned Salesperson. Search by lead name, company name, or email (bonus).

### Lead Fields
Each lead includes: Lead Name, Company Name, Email, Phone Number, Lead Source, Assigned Salesperson, Status (New → Contacted → Qualified → Proposal Sent → Won / Lost), Estimated Deal Value, Created Date, and Last Updated Date.

### Note Fields
Each note includes: Note Content, Created By (auto-filled from logged-in user), and Created Date.

### Bonus Features
- 🎁 **Search** across lead name, company name, and email simultaneously.
- 🎁 **Modern Premium UI** with glassmorphism login, gradient backgrounds, Inter font, and micro-animations.
- 🎁 **Animated loading spinners** on all pages for a polished user experience.

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** v18 or higher
- A free [Supabase](https://supabase.com/) account and project

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/crm-system.git
cd crm-system
```

### Step 2: Database Setup
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project and navigate to **SQL Editor**.
3. Copy and paste the contents of `backend/setup.sql` into the editor.
4. Click **Run**. This creates the `users`, `leads`, and `notes` tables and inserts a default admin user.

### Step 3: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Edit the `.env` file with your Supabase credentials (see [Environment Variables](#-environment-variables) below), then:
```bash
npm run dev
```
The backend server will start on `http://localhost:5000`.

### Step 4: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend dev server will start on `http://localhost:5173`.

### Step 5: Open the App
Navigate to **http://localhost:5173** in your browser and log in with the test credentials below.

---

## 🔑 Test Login Credentials

| Field    | Value                |
| -------- | -------------------- |
| Email    | `admin@example.com`  |
| Password | `password123`        |

> These credentials are pre-seeded into the database via `backend/setup.sql`. The password is stored as a bcrypt hash.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable                   | Description                                          | Example                              |
| -------------------------- | ---------------------------------------------------- | ------------------------------------ |
| `PORT`                     | Port for the Express server                          | `5000`                               |
| `SUPABASE_URL`             | Your Supabase project URL                            | `https://xxxxx.supabase.co`          |
| `SUPABASE_SERVICE_ROLE_KEY`| Your Supabase Service Role Key (Settings → API)      | `eyJhbGciOi...`                      |
| `JWT_SECRET`               | Secret key used to sign JWT tokens                   | `super_secret_jwt_key_12345`         |

> **Where to find Supabase credentials:** Go to your Supabase Dashboard → Project Settings → API. Copy the **Project URL** and the **service_role** key (not the anon key).

---

## 🗄️ Database Setup

The database schema is defined in `backend/setup.sql`. It creates three tables:

### Tables

**`users`** — Stores application users for authentication.
| Column          | Type          | Description                    |
| --------------- | ------------- | ------------------------------ |
| `id`            | UUID (PK)     | Auto-generated unique ID       |
| `email`         | TEXT (UNIQUE)  | User email address             |
| `password_hash` | TEXT          | bcrypt-hashed password         |
| `created_at`    | TIMESTAMPTZ   | Account creation timestamp     |

**`leads`** — Stores all sales leads.
| Column                | Type          | Description                         |
| --------------------- | ------------- | ----------------------------------- |
| `id`                  | UUID (PK)     | Auto-generated unique ID            |
| `lead_name`           | TEXT          | Name of the lead (required)         |
| `company_name`        | TEXT          | Company the lead belongs to         |
| `email`               | TEXT          | Lead's email address                |
| `phone_number`        | TEXT          | Lead's phone number                 |
| `lead_source`         | TEXT          | How the lead was acquired           |
| `assigned_salesperson` | TEXT         | Salesperson managing this lead      |
| `status`              | TEXT          | Pipeline status (default: "New")    |
| `estimated_deal_value`| NUMERIC       | Monetary value of the deal          |
| `created_at`          | TIMESTAMPTZ   | Lead creation timestamp             |
| `updated_at`          | TIMESTAMPTZ   | Last modification timestamp         |

**`notes`** — Stores notes attached to leads.
| Column         | Type          | Description                              |
| -------------- | ------------- | ---------------------------------------- |
| `id`           | UUID (PK)     | Auto-generated unique ID                 |
| `lead_id`      | UUID (FK)     | References `leads.id` (cascade delete)   |
| `note_content` | TEXT          | The note text (required)                 |
| `created_by`   | TEXT          | Email of the user who created the note   |
| `created_at`   | TIMESTAMPTZ   | Note creation timestamp                  |

---

## 📁 Project Structure

```
crm-system/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Login & user verification
│   │   ├── leadController.js      # CRUD + dashboard stats
│   │   └── noteController.js      # Notes CRUD
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification middleware
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   ├── leadRoutes.js          # /api/leads/*
│   │   └── noteRoutes.js          # /api/notes/*
│   ├── db.js                      # Supabase client init
│   ├── server.js                  # Express app entry point
│   ├── setup.sql                  # Database schema & seed data
│   ├── .env.example               # Environment variable template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx         # App shell with sidebar
│   │   │   └── Navbar.jsx         # Sidebar navigation
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Dashboard.jsx      # Dashboard with stats
│   │   │   ├── Leads.jsx          # Lead list with search/filter
│   │   │   ├── LeadDetails.jsx    # Single lead view + notes
│   │   │   └── CreateEditLead.jsx # Create/edit lead form
│   │   ├── api.js                 # Axios instance with JWT interceptor
│   │   ├── App.jsx                # Routes & protected routes
│   │   └── main.jsx               # React entry point
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## ⚠️ Known Limitations

- **Single user role** — There is no role-based access control (admin vs. salesperson). All authenticated users have full CRUD access.
- **No password reset** — Users cannot reset their password through the UI. It must be done manually in the database.
- **No real-time updates** — The dashboard and lead list do not auto-refresh when another user makes changes. A manual page refresh is needed.
- **Supabase free tier cold starts** — On the Supabase free plan, the database may pause after inactivity. The first request after a pause can take 10–20 seconds while the database wakes up.
- **No pagination** — The lead list loads all leads at once. For very large datasets, server-side pagination would be needed.
- **No input validation on backend** — The backend trusts the incoming request body. Production apps should validate and sanitize all inputs.

---

## 💭 Reflection

This project was a great opportunity to build a complete full-stack application from scratch. Here are my key takeaways:

**What went well:**
- **Supabase as a database** was an excellent choice. It gave me a fully managed PostgreSQL database with a clean JavaScript client library, which made CRUD operations straightforward without writing raw SQL queries in the application code.
- **React + Vite** provided an incredibly fast development experience with hot module replacement.
- **Tailwind CSS** allowed me to build a polished, modern UI rapidly without context-switching between component files and CSS files.
- **JWT authentication** was clean to implement — the middleware pattern in Express made it easy to protect all API routes.

**What I learned:**
- How to structure a full-stack app with a clear separation between frontend, backend API, and database layers.
- How to implement JWT-based authentication end-to-end (hashing passwords with bcrypt, signing tokens, verifying tokens in middleware, storing tokens on the client).
- How to design a relational database schema with foreign key constraints (e.g., `notes.lead_id` referencing `leads.id` with cascade delete).
- The importance of error handling and loading states for a smooth user experience.

**What I'd improve with more time:**
- Add role-based access control so different salespersons only see their assigned leads.
- Implement real-time updates using Supabase Realtime subscriptions.
- Add server-side pagination and more robust input validation.
- Write unit and integration tests for the backend API.
- Add a dark mode toggle.

---

## 📄 License

This project was built as part of a full-stack developer internship assessment.
