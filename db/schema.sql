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

-- Existing databases may contain historical duplicate emails, so only create the
-- unique index when the table is already clean. The trigger blocks new duplicates
-- without deleting or moving existing rows.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM registrations GROUP BY lower(email) HAVING count(*) > 1
  ) THEN
    CREATE UNIQUE INDEX IF NOT EXISTS registrations_email_unique_idx ON registrations (lower(email));
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION prevent_duplicate_registration_email()
RETURNS trigger AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM registrations WHERE lower(email) = lower(NEW.email)) THEN
    RAISE EXCEPTION 'This email is already registered for Conference 5.0.'
      USING ERRCODE = '23505', CONSTRAINT = 'registrations_email_unique_idx';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS registrations_unique_email_trigger ON registrations;
CREATE TRIGGER registrations_unique_email_trigger
  BEFORE INSERT ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION prevent_duplicate_registration_email();

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
