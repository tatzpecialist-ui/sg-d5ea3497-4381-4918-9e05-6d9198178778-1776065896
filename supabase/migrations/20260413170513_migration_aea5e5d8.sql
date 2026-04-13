-- Create portfolio_items table with YouTube support
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('video-editing', 'live-events', 'documentary', 'corporate-av')),
  description TEXT,
  youtube_url TEXT NOT NULL,
  youtube_video_id TEXT NOT NULL,
  thumbnail_url TEXT,
  year TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies (public read, auth write for admin)
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_portfolio" ON portfolio_items 
FOR SELECT 
USING (true);

CREATE POLICY "auth_manage_portfolio" ON portfolio_items 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create index for faster queries
CREATE INDEX idx_portfolio_category ON portfolio_items(category);
CREATE INDEX idx_portfolio_featured ON portfolio_items(featured);
CREATE INDEX idx_portfolio_created_at ON portfolio_items(created_at DESC);