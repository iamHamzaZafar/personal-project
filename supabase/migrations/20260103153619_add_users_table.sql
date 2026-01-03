-- Create enum type for role
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- Create users table with all auth information
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  email_confirmed_at TIMESTAMPTZ,
  phone TEXT,
  phone_confirmed_at TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ,
  app_metadata JSONB DEFAULT '{}'::jsonb,
  user_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Custom fields
  role user_role DEFAULT 'user' NOT NULL,
  
  -- Additional user info
  full_name TEXT,
  avatar_url TEXT
);

-- Create indexes for faster lookups
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all users
CREATE POLICY "Admins can update all users" ON public.users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to prevent users from changing their own role
CREATE OR REPLACE FUNCTION public.prevent_role_change()
RETURNS TRIGGER AS $$
BEGIN
  -- If the role is being changed
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    -- Check if the current user is an admin
    IF NOT EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    ) THEN
      -- Non-admins cannot change roles, revert to old role
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to prevent role changes by non-admins
CREATE TRIGGER prevent_role_change_trigger
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_change();

-- Function to sync auth.users to public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    email_confirmed_at,
    phone,
    phone_confirmed_at,
    confirmed_at,
    last_sign_in_at,
    app_metadata,
    user_metadata,
    created_at,
    updated_at,
    full_name,
    avatar_url
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.email_confirmed_at,
    NEW.phone,
    NEW.phone_confirmed_at,
    NEW.confirmed_at,
    NEW.last_sign_in_at,
    NEW.raw_app_meta_data,
    NEW.raw_user_meta_data,
    NEW.created_at,
    NEW.updated_at,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    email_confirmed_at = EXCLUDED.email_confirmed_at,
    phone = EXCLUDED.phone,
    phone_confirmed_at = EXCLUDED.phone_confirmed_at,
    confirmed_at = EXCLUDED.confirmed_at,
    last_sign_in_at = EXCLUDED.last_sign_in_at,
    app_metadata = EXCLUDED.app_metadata,
    user_metadata = EXCLUDED.user_metadata,
    updated_at = EXCLUDED.updated_at,
    full_name = COALESCE(EXCLUDED.full_name, users.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to sync on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger to sync on user update
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to sync existing auth users (run this once manually if needed)
CREATE OR REPLACE FUNCTION public.sync_existing_users()
RETURNS void AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    email_confirmed_at,
    phone,
    phone_confirmed_at,
    confirmed_at,
    last_sign_in_at,
    app_metadata,
    user_metadata,
    created_at,
    updated_at,
    full_name,
    avatar_url
  )
  SELECT
    id,
    email,
    email_confirmed_at,
    phone,
    phone_confirmed_at,
    confirmed_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name'),
    raw_user_meta_data->>'avatar_url'
  FROM auth.users
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    email_confirmed_at = EXCLUDED.email_confirmed_at,
    phone = EXCLUDED.phone,
    phone_confirmed_at = EXCLUDED.phone_confirmed_at,
    confirmed_at = EXCLUDED.confirmed_at,
    last_sign_in_at = EXCLUDED.last_sign_in_at,
    app_metadata = EXCLUDED.app_metadata,
    user_metadata = EXCLUDED.user_metadata,
    updated_at = EXCLUDED.updated_at,
    full_name = COALESCE(EXCLUDED.full_name, users.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;