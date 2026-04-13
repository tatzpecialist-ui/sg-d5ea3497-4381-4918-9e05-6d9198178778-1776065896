-- Fix RLS: Allow anonymous users to submit bookings (T3 pattern for public forms)
CREATE POLICY "anon_insert_bookings" ON bookings 
FOR INSERT 
WITH CHECK (true);

-- Allow public read of bookings (for confirmation page)
CREATE POLICY "public_read_bookings" ON bookings 
FOR SELECT 
USING (true);