-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert dummy admin user (password is 'password123' hashed with bcrypt)
INSERT INTO
    public.users (email, password_hash)
SELECT 'admin@example.com', '$2a$10$czjT6QQ.1UgQ0N6t.//E.eIdiM4RFFnC2XB.shrl2pAWrCdbx82sq'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM public.users
        WHERE
            email = 'admin@example.com'
    );

-- LEADS TABLE
create table if not exists public.leads (
    id uuid default gen_random_uuid () primary key,
    lead_name text not null,
    company_name text,
    email text,
    phone_number text,
    lead_source text,
    assigned_salesperson text,
    status text default 'New',
    estimated_deal_value numeric default 0,
    created_at timestamp
    with
        time zone default timezone ('utc', now()),
        updated_at timestamp
    with
        time zone default timezone ('utc', now())
);

-- NOTES TABLE
create table if not exists public.notes (
    id uuid default gen_random_uuid () primary key,
    lead_id uuid references public.leads (id) on delete cascade,
    note_content text not null,
    created_by text,
    created_at timestamp
    with
        time zone default timezone ('utc', now())
);