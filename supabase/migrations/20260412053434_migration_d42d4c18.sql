-- Bookings table for client project requests
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL CHECK (service_type IN ('video_editing', 'live_events', 'documentary', 'corporate_av')),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  company_name TEXT,
  project_title TEXT NOT NULL,
  project_description TEXT NOT NULL,
  preferred_start_date DATE,
  preferred_end_date DATE,
  budget_range TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS policies - public can submit, only authenticated can view all
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_submit" ON bookings 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "authenticated_can_view" ON bookings 
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_can_update" ON bookings 
  FOR UPDATE USING (auth.uid() IS NOT NULL);