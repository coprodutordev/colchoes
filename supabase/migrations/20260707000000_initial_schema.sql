-- ===========================================================
-- REMVITA - Initial Database Schema
-- Version: 1.0.0
-- Last Updated: 2026-07-07
-- ===========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================================
-- 2. UTILITY FUNCTIONS
-- ===========================================================

-- Auto-update updated_at column on record changes
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto-create profile on new auth.user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Dashboard stats function (avoids multiple roundtrips from the frontend)
CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  total_leads INTEGER;
  total_closed INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_leads
  FROM public.leads
  WHERE created_at >= date_trunc('month', CURRENT_DATE);

  SELECT COUNT(*) INTO total_closed
  FROM public.leads
  WHERE status = 'fechado'
    AND created_at >= date_trunc('month', CURRENT_DATE);

  RETURN json_build_object(
    'monthly_leads', total_leads,
    'monthly_closed', total_closed
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===========================================================
-- 3. TABLES
-- ===========================================================

-- Roles
CREATE TABLE public.roles (
  id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO public.roles (name) VALUES ('SuperAdmin'), ('Editor'), ('Comercial'), ('Consultor');

-- Permissions
CREATE TABLE public.permissions (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id   UUID REFERENCES public.roles(id) ON DELETE CASCADE,
  action    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role_id, action)
);

-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id    UUID REFERENCES public.roles(id),
  full_name  TEXT,
  avatar_url TEXT,
  phone      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TRIGGER trigger_create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Categories (supports nested via parent_id)
CREATE TABLE public.categories (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name      TEXT NOT NULL,
  slug      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER trigger_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Technologies
CREATE TABLE public.technologies (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT,
  icon_url    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE public.products (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  price       NUMERIC(10, 2),
  is_active   BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_products_slug      ON public.products(slug);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Product Technologies (n:n pivot)
CREATE TABLE public.product_technologies (
  product_id    UUID REFERENCES public.products(id) ON DELETE CASCADE,
  technology_id UUID REFERENCES public.technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, technology_id)
);

-- Product Images
CREATE TABLE public.product_images (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id    UUID REFERENCES public.products(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  is_primary    BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);

-- Product Manuals (PDFs)
CREATE TABLE public.product_manuals (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  file_url   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Authors
CREATE TABLE public.authors (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name       TEXT NOT NULL,
  bio        TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts
CREATE TABLE public.posts (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id        UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  excerpt          TEXT,
  content          TEXT,
  cover_image_url  TEXT,
  read_time_minutes INTEGER,
  status           TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_posts_slug   ON public.posts(slug);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE TRIGGER trigger_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Tags
CREATE TABLE public.tags (
  id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- Post Tags (n:n pivot)
CREATE TABLE public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id  UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Testimonials
CREATE TABLE public.testimonials (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID REFERENCES public.products(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  rating      INTEGER CHECK (rating BETWEEN 1 AND 5),
  content     TEXT NOT NULL,
  video_url   TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ
CREATE TABLE public.faq (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id    UUID REFERENCES public.products(id) ON DELETE SET NULL,
  category      TEXT,
  question      TEXT NOT NULL,
  answer        TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE public.leads (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  name       TEXT NOT NULL,
  email      TEXT,
  phone      TEXT NOT NULL,
  status     TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contato_feito', 'negociacao', 'fechado')),
  origin     TEXT,
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE TRIGGER trigger_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Contacts
CREATE TABLE public.contacts (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  resolved   BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners & Resellers
CREATE TABLE public.partners (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type         TEXT CHECK (type IN ('Clinica', 'Loja', 'Independente')),
  company_name TEXT NOT NULL,
  cnpj         TEXT,
  address      TEXT,
  city         TEXT,
  state        TEXT,
  contact_phone TEXT,
  approved     BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Media Gallery
CREATE TABLE public.media_gallery (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uploaded_by UUID REFERENCES auth.users(id),
  file_name   TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  mime_type   TEXT,
  size        INTEGER,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Banners
CREATE TABLE public.banners (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT,
  image_desktop  TEXT NOT NULL,
  image_mobile   TEXT,
  link           TEXT,
  is_active      BOOLEAN DEFAULT true,
  display_order  INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (singleton row)
CREATE TABLE public.site_settings (
  id                       INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  whatsapp_number          TEXT,
  maintenance_mode         BOOLEAN DEFAULT false,
  global_announcement_bar  JSONB,
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO public.site_settings (id) VALUES (1);

-- Admin Audit Logs
CREATE TABLE public.admin_logs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action       TEXT NOT NULL,
  target_table TEXT NOT NULL,
  details      JSONB,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================================
-- 4. VIEWS
-- ===========================================================

CREATE OR REPLACE VIEW public.vw_product_catalog AS
SELECT
  p.id,
  p.name,
  p.slug,
  p.price,
  p.is_featured,
  c.name        AS category_name,
  pi.url        AS primary_image
FROM public.products p
LEFT JOIN public.categories    c  ON p.category_id = c.id
LEFT JOIN public.product_images pi ON p.id = pi.product_id AND pi.is_primary = true
WHERE p.is_active = true;

CREATE OR REPLACE VIEW public.vw_active_leads AS
SELECT *
FROM public.leads
WHERE status != 'fechado';

-- ===========================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ===========================================================

-- Enable RLS on all public tables
ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_gallery    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings    ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (anyone can read active content)
CREATE POLICY "Public: read active products"
  ON public.products FOR SELECT USING (is_active = true);

CREATE POLICY "Public: read all categories"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Public: read published posts"
  ON public.posts FOR SELECT USING (status = 'published');

CREATE POLICY "Public: read approved testimonials"
  ON public.testimonials FOR SELECT USING (is_approved = true);

-- PUBLIC INSERT POLICIES (anonymous form submissions)
CREATE POLICY "Public: insert leads"
  ON public.leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Public: insert contacts"
  ON public.contacts FOR INSERT WITH CHECK (true);

-- USER SELF-SERVICE POLICIES
CREATE POLICY "User: view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "User: update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- AUTHENTICATED ADMIN POLICIES (checked via RPC or helper function)
-- Note: For full RBAC, implement a has_role() helper function
CREATE POLICY "Authenticated: read all leads"
  ON public.leads FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated: update leads"
  ON public.leads FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated: read contacts"
  ON public.contacts FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated: manage media"
  ON public.media_gallery FOR ALL USING (auth.role() = 'authenticated');

-- ADMIN LOGS (read-only for authenticated)
CREATE POLICY "Authenticated: read admin logs"
  ON public.admin_logs FOR SELECT USING (auth.role() = 'authenticated');

-- ===========================================================
-- 6. STORAGE BUCKETS
-- Note: Run these in the Supabase dashboard Storage section
-- or via the Management API. SQL syntax shown for documentation.
-- ===========================================================
-- bucket: product_images (public)
-- bucket: blog_covers    (public)
-- bucket: media_gallery  (public)
-- bucket: documents      (private - signed URLs for manuals/warranties)
-- bucket: videos         (public)
