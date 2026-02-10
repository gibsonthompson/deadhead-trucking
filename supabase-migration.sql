-- ============================================
-- Deadhead Trucking LLC - Quote Submissions Table
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/oschjeuhejqibymdaqxw/sql/new
-- ============================================

CREATE TABLE IF NOT EXISTS deadhead_quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  origin TEXT,
  destination TEXT,
  freight_type TEXT CHECK (freight_type IN ('general', 'auto', 'hazmat', 'other')),
  details TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'booked', 'closed')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE deadhead_quotes ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the website form)
CREATE POLICY "Allow public inserts" ON deadhead_quotes
  FOR INSERT WITH CHECK (true);

-- Allow reads with service role (for the dashboard)
CREATE POLICY "Allow service role reads" ON deadhead_quotes
  FOR SELECT USING (true);

-- Allow updates with service role (for status changes)
CREATE POLICY "Allow service role updates" ON deadhead_quotes
  FOR UPDATE USING (true);

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_deadhead_quotes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_deadhead_quotes_updated_at
  BEFORE UPDATE ON deadhead_quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_deadhead_quotes_updated_at();

-- Index for dashboard queries
CREATE INDEX idx_deadhead_quotes_status ON deadhead_quotes(status);
CREATE INDEX idx_deadhead_quotes_created ON deadhead_quotes(created_at DESC);
