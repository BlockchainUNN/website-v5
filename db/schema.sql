-- Blockchain UNN v5 conference forms
-- Run against the blockathonv5 database:
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/schema.sql

CREATE TABLE IF NOT EXISTS registrations (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at  timestamptz NOT NULL DEFAULT now(),
  first_name    text NOT NULL,
  last_name     text NOT NULL,
  email         text NOT NULL,
  phone         text NOT NULL,
  attendance    text NOT NULL CHECK (attendance IN ('physical', 'virtual')),
  hackathon     boolean NOT NULL DEFAULT false,
  track         text NOT NULL DEFAULT '',
  team          jsonb NOT NULL DEFAULT '[]'::jsonb,
  idea          text NOT NULL DEFAULT '',
  email_sent    boolean NOT NULL DEFAULT false,
  user_agent    text,
  ip_hash       text
);

CREATE INDEX IF NOT EXISTS registrations_email_idx ON registrations (lower(email));
CREATE INDEX IF NOT EXISTS registrations_submitted_at_idx ON registrations (submitted_at);

CREATE TABLE IF NOT EXISTS submissions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at    timestamptz NOT NULL DEFAULT now(),
  team_name       text NOT NULL,
  leader_name     text NOT NULL,
  leader_email    text NOT NULL,
  other_members   text NOT NULL DEFAULT '',
  project_name    text NOT NULL,
  one_liner       text NOT NULL,
  description     text NOT NULL,
  pitch_deck_url  text NOT NULL,
  code_url        text NOT NULL,
  demo_url        text NOT NULL DEFAULT '',
  live_url        text NOT NULL DEFAULT '',
  user_agent      text,
  ip_hash         text
);

CREATE INDEX IF NOT EXISTS submissions_leader_email_idx ON submissions (lower(leader_email));
CREATE INDEX IF NOT EXISTS submissions_submitted_at_idx ON submissions (submitted_at);
