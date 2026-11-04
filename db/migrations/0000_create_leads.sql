-- Migration 0000: Create `leads` table and least-privilege application writer role
-- Target: Neon Serverless Postgres (PostgreSQL 16+)

CREATE TABLE IF NOT EXISTS "leads" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar(100) NOT NULL,
  "company" varchar(120) NOT NULL,
  "email" varchar(160) NOT NULL,
  "phone" varchar(30),
  "product_interest" varchar(80) NOT NULL,
  "message" text NOT NULL,
  "consent" boolean DEFAULT true NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

-- Least-privilege role setup (run as Neon database owner):
-- DO $$
-- BEGIN
--   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'mex_app_writer') THEN
--     CREATE ROLE mex_app_writer WITH LOGIN PASSWORD 'REPLACE_WITH_STRONG_SECRET';
--   END IF;
-- END
-- $$;
-- GRANT CONNECT ON DATABASE neondb TO mex_app_writer;
-- GRANT USAGE ON SCHEMA public TO mex_app_writer;
-- GRANT INSERT ON TABLE public.leads TO mex_app_writer;
-- GRANT USAGE, SELECT ON SEQUENCE public.leads_id_seq TO mex_app_writer;
-- REVOKE SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.leads FROM mex_app_writer;

