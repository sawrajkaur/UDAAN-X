-- UDAAN X v1.0.1 security hardening. Run after 20261124_v1_0.sql.
-- RLS alone does not restrict which columns a user may update. This grant
-- prevents a normal signed-in user from changing profiles.role to admin.
revoke update on table public.profiles from public, anon, authenticated;
grant update (display_name, preferred_language, updated_at)
  on table public.profiles to authenticated;

-- Keep the owner-only row policy in place; column grants and RLS both apply.
-- Admin role assignment must be performed by a trusted project owner in SQL Editor.
