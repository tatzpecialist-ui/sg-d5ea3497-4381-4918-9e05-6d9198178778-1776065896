-- Force PostgREST schema cache reload by triggering a DDL change
ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS _cache_buster BOOLEAN DEFAULT false;
ALTER TABLE portfolio_items DROP COLUMN IF EXISTS _cache_buster;