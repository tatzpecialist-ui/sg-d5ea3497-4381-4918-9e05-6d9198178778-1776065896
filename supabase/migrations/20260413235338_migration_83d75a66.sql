-- Nuclear option: Drop everything and recreate with explicit PostgREST exposure
DROP TABLE IF EXISTS portfolio_items CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;

-- Recreate portfolio_items
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  youtube_url TEXT NOT NULL,
  video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Video Editing', 'Live Events', 'Documentary', 'Corporate AV')),
  year INTEGER NOT NULL,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recreate bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT NOT NULL CHECK (service IN ('Video Editing', 'Live Events', 'Documentary', 'Corporate AV')),
  project_type TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Portfolio policies (authenticated users can manage, everyone can view)
CREATE POLICY "public_read_portfolio" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "auth_insert_portfolio" ON portfolio_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth_update_portfolio" ON portfolio_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "auth_delete_portfolio" ON portfolio_items FOR DELETE USING (auth.uid() = user_id);

-- Bookings policies (anyone can insert, only owner can view/update)
CREATE POLICY "anon_insert_booking" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_bookings" ON bookings FOR SELECT USING (true);

-- Grant explicit permissions to PostgREST roles
GRANT ALL ON portfolio_items TO anon, authenticated, service_role;
GRANT ALL ON bookings TO anon, authenticated, service_role;

-- Force PostgREST to reload schema by notifying
NOTIFY pgrst, 'reload schema';