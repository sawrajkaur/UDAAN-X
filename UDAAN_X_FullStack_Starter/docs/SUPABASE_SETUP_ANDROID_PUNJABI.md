# UDAAN X — Android ਤੋਂ Supabase Setup (Punjabi)

## ਤੁਸੀਂ ਹੁਣ ਤੱਕ ਕੀ ਕੀਤਾ ਹੈ
- `VYORA AI` organization ਬਣਾਈ।
- `UDAAN-X` ਨਾਮ ਦਾ Supabase project ਬਣਾਇਆ।
- Region: South Asia (Mumbai) ਚੁਣਿਆ।

## ਹੁਣ Database ਬਣਾਉਣਾ
1. Supabase Dashboard ਵਿੱਚ `UDAAN-X` project ਖੋਲ੍ਹੋ।
2. ਖੱਬੇ ਪਾਸੇ **SQL Editor** ਖੋਲ੍ਹੋ।
3. **New query** ਦਬਾਓ।
4. ਇਸ ZIP ਦੇ `supabase/SETUP_ALL.sql` ਨੂੰ ਖੋਲ੍ਹੋ।
5. ਪੂਰਾ ਕੋਡ Copy ਕਰਕੇ SQL Editor ਵਿੱਚ Paste ਕਰੋ।
6. ਪਹਿਲਾਂ query ਦੇ ਅੰਤ ਤੱਕ ਸਕ੍ਰੋਲ ਕਰਕੇ ਚੈੱਕ ਕਰੋ ਕਿ ਪੂਰਾ ਕੋਡ paste ਹੋਇਆ ਹੈ।
7. **Run** ਦਬਾਓ।
8. ਜੇ ਹੇਠਾਂ `Success. No rows returned` ਜਾਂ ਸਮਾਨ success ਸੁਨੇਹਾ ਆਵੇ, screenshot ਭੇਜੋ।

ਇਹ SQL ਇਸੇ Starter ਦੀਆਂ table names ਅਤੇ fields ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ। ਇਸ ਨੂੰ ਨਵੇਂ ਖਾਲੀ `UDAAN-X` project ਵਿੱਚ ਇੱਕ ਵਾਰ ਚਲਾਉਣ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ। ਇਸ ਨੂੰ Library ਵਾਲੇ project ਵਿੱਚ ਨਾ ਚਲਾਓ।

## ਮਹੱਤਵਪੂਰਨ ਸੁਰੱਖਿਆ
- Database password, `service_role` key ਜਾਂ AI secret ਕਿਸੇ ਨੂੰ ਨਾ ਭੇਜੋ।
- `service_role` key ਨੂੰ `NEXT_PUBLIC_` variable ਵਿੱਚ ਕਦੇ ਨਾ ਰੱਖੋ।
- SQL Editor ਵਿੱਚ project owner ਵਜੋਂ SQL ਚਲਾਉਣਾ ਲੋੜੀਂਦਾ ਹੈ।
- ਇਹ schema RLS policies ਲਗਾਉਂਦੀ ਹੈ, ਪਰ production ਤੋਂ ਪਹਿਲਾਂ ਵੱਖਰੇ test accounts ਨਾਲ access test ਅਤੇ security review ਲਾਜ਼ਮੀ ਹੈ।

## ਅਗਲਾ ਪੜਾਅ
Database ਬਣਨ ਤੋਂ ਬਾਅਦ Project Settings → API ਵਿੱਚੋਂ Project URL ਅਤੇ publishable/anon key ਲੈ ਕੇ hosting ਦੇ Environment Variables ਵਿੱਚ ਰੱਖਣੇ ਹਨ। Secret values ਨੂੰ screenshot ਜਾਂ chat ਵਿੱਚ ਨਾ ਭੇਜੋ। ਤੁਸੀਂ ਸਿਰਫ਼ ਇਹ ਦੱਸੋ ਕਿ URL/key ਵਾਲਾ ਪੰਨਾ ਖੁੱਲ ਗਿਆ ਹੈ; values ਖੁਦ hosting ਦੇ secret fields ਵਿੱਚ ਪਾਓ।

## ਹਾਲੇ ਕੀ Live ਨਹੀਂ
ਇਹ source code ਹੈ। Database SQL ਚਲਾਉਣ ਨਾਲ website ਆਪਣੇ ਆਪ deploy ਨਹੀਂ ਹੁੰਦੀ। ਇਸ ਤੋਂ ਬਾਅਦ cloud hosting, server-side AI provider key, production build ਅਤੇ login/chat tests ਕਰਨੇ ਹੋਣਗੇ।
