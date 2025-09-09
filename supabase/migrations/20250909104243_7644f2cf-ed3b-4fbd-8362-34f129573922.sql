-- Fix function search path issues for security
ALTER FUNCTION public.ensure_single_active_website() SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;