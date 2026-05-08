# CRM Application

A full-stack CRM application built with React, Node.js (Express), Supabase (PostgreSQL), and Tailwind CSS.

## Features

- **Authentication**: JWT-based auth via backend
- **Dashboard**: High-level overview of leads, values, and status
- **Lead Management**: Create, Read, Update, Delete (CRUD) leads
- **Search & Filtering**: Search by name/company/email, filter by status
- **Lead Notes**: Add timestamped notes to leads
- **Responsive UI**: Built with Tailwind CSS and Lucide icons

## Tech Stack

- **Frontend**: React (Vite), React Router v6, Tailwind CSS, Axios, Lucide React
- **Backend**: Node.js, Express, Supabase JS Client, JWT, bcryptjs
- **Database**: Supabase (PostgreSQL)

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- A [Supabase](https://supabase.com/) account and project

### 1. Database Setup
1. Go to your Supabase project dashboard.
2. Navigate to the **SQL Editor**.
3. Copy the contents of `backend/setup.sql` and paste it into the SQL Editor.
4. Run the script. This will create the `users`, `leads`, and `notes` tables, and insert a default admin user.

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```
4. Fill in the `.env` variables with your Supabase Project URL and Service Role Key (found in Supabase Project Settings -> API).
5. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 4. Login
- Open the frontend app in your browser (usually `http://localhost:5173`).
- **Test Credentials:**
  - Email: `admin@example.com`
  - Password: `password123`

## Environment Variables (.env)
- `PORT`: Port for the backend server (default 5000)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (needed to query the `users` table)
- `JWT_SECRET`: Secret key for JWT signing

## Reflection
This CRM implements all core requirements along with search and filtering bonuses. Supabase provides a robust PostgreSQL foundation, while the Express backend handles business logic and security via JWT. The React frontend is designed with a modern, clean UI using Tailwind CSS, featuring responsive layouts and intuitive workflows.
