-- Create a dummy table to force PostgREST schema reload
CREATE TABLE IF NOT EXISTS _schema_reload_trigger (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert a row
INSERT INTO _schema_reload_trigger (created_at) VALUES (NOW());

-- Drop the dummy table
DROP TABLE _schema_reload_trigger;