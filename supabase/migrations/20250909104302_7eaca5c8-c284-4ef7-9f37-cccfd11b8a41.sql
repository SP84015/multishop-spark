-- Create websites table
CREATE TABLE public.websites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT false,
  
  -- Content fields
  about_title TEXT,
  about_content TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  
  -- Asset URLs (stored in storage)
  logo_url TEXT,
  banner_url TEXT,
  
  -- SEO fields
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  
  -- Theme customization
  theme_primary_color TEXT DEFAULT 'hsl(234, 89%, 74%)',
  theme_secondary_color TEXT DEFAULT 'hsl(220, 14%, 96%)',
  theme_accent_color TEXT DEFAULT 'hsl(234, 89%, 74%)',
  theme_font_family TEXT DEFAULT 'Inter',
  
  -- Social links
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_linkedin TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

-- Create services table for website services
CREATE TABLE public.website_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT, -- Lucide icon name
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_services ENABLE ROW LEVEL SECURITY;

-- Create gallery images table
CREATE TABLE public.website_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_gallery ENABLE ROW LEVEL SECURITY;

-- Create contact form submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public access to websites (read-only)
CREATE POLICY "Websites are viewable by everyone" 
ON public.websites 
FOR SELECT 
USING (true);

CREATE POLICY "Website services are viewable by everyone" 
ON public.website_services 
FOR SELECT 
USING (true);

CREATE POLICY "Website gallery is viewable by everyone" 
ON public.website_gallery 
FOR SELECT 
USING (true);

-- Admin policies (only admins can manage websites)
CREATE POLICY "Admins can manage websites" 
ON public.websites 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage website services" 
ON public.website_services 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage website gallery" 
ON public.website_gallery 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can submit contact forms
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Storage policies for website assets
CREATE POLICY "Website assets are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'website-assets');

CREATE POLICY "Admins can upload website assets" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'website-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update website assets" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'website-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete website assets" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'website-assets' AND has_role(auth.uid(), 'admin'::app_role));

-- Trigger to ensure only one active website
CREATE OR REPLACE FUNCTION public.ensure_single_active_website()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting a website to active, deactivate all others
  IF NEW.is_active = true THEN
    UPDATE public.websites 
    SET is_active = false 
    WHERE id != NEW.id AND is_active = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_active_website_trigger
  BEFORE INSERT OR UPDATE ON public.websites
  FOR EACH ROW
  EXECUTE FUNCTION public.ensure_single_active_website();

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_websites_updated_at
  BEFORE UPDATE ON public.websites
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();