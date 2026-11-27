# UDAAN X — ਸੁਰੱਖਿਆ ਚੈੱਕਲਿਸਟ (ਪੰਜਾਬੀ)

## ਪਹਿਲੀ ਲਾਜ਼ਮੀ ਸੈਟਿੰਗ
1. Supabase SQL Editor ਵਿੱਚ ਪਹਿਲਾਂ `supabase/schema.sql` ਚਲਾਓ।
2. ਫਿਰ `supabase/migrations/20261124_v1_0.sql` ਚਲਾਓ।
3. ਫਿਰ `supabase/migrations/20261124_v1_0_1_security_hardening.sql` ਚਲਾਓ।
4. ਆਮ user ਨੂੰ ਕਦੇ ਵੀ `profiles.role = 'admin'` ਨਾ ਦਿਓ। Admin role ਸਿਰਫ਼ project owner trusted SQL Editor ਤੋਂ ਦੇਵੇ।
5. Supabase `service_role` key ਕਦੇ browser ਜਾਂ `NEXT_PUBLIC_` variable ਵਿੱਚ ਨਾ ਰੱਖੋ।
6. AI/Tavily keys ਸਿਰਫ਼ hosting ਦੇ server-side environment variables ਵਿੱਚ ਰੱਖੋ।
7. ਅਸਲੀ users ਨੂੰ invite ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਵੱਖਰੇ ਦੋ test accounts ਨਾਲ RLS ਜਾਂਚੋ: ਇੱਕ user ਦੂਜੇ user ਦੀ chat, memory, task ਜਾਂ profile ਨਾ ਪੜ੍ਹ ਸਕੇ।
8. Public launch ਤੋਂ ਪਹਿਲਾਂ rate limiting, CAPTCHA/abuse prevention, backup, privacy policy, data deletion process ਅਤੇ independent security review ਲਾਜ਼ਮੀ ਹਨ।

## Admin role ਦੇਣ ਦਾ ਸੁਰੱਖਿਅਤ ਤਰੀਕਾ
Supabase Authentication ਵਿੱਚ user ਦੀ UUID ਲੱਭੋ ਅਤੇ project owner ਵਜੋਂ SQL Editor ਵਿੱਚ ਇਹ query ਚਲਾਓ (UUID ਆਪਣੀ ਸਹੀ value ਨਾਲ ਬਦਲੋ):

```sql
update public.profiles
set role = 'admin'
where id = 'PASTE-EXACT-AUTH-USER-UUID-HERE';
```

ਇਹ query ਸਿਰਫ਼ trusted project owner ਚਲਾਏ।
