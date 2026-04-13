-- Also refresh bookings table cache
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS _cache_buster BOOLEAN DEFAULT false;
ALTER TABLE bookings DROP COLUMN IF EXISTS _cache_buster;