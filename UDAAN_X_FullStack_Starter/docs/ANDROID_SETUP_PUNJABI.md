# Android ਮੋਬਾਈਲ ਤੋਂ UDAAN X ਸੈੱਟਅੱਪ

## ਜ਼ਰੂਰੀ ਸੱਚਾਈ
ਇਹ ZIP ਇੱਕ Next.js full-stack starter ਹੈ। ਇਸ ਨੂੰ ਸਿਰਫ਼ ZIP ਖੋਲ੍ਹ ਕੇ ਸਿੱਧਾ Android ਐਪ ਵਾਂਗ ਨਹੀਂ ਚਲਾਇਆ ਜਾ ਸਕਦਾ। ਇਸ ਲਈ cloud development/hosting, Supabase ਅਤੇ AI provider account ਦੀ ਲੋੜ ਹੈ।

## Android ਤੋਂ ਕੰਮ ਕਰਨ ਦਾ ਰਸਤਾ
1. Chrome ਵਿੱਚ ZIP ਡਾਊਨਲੋਡ ਕਰੋ ਅਤੇ Files ਐਪ ਵਿੱਚ ਇਸ ਨੂੰ ਸੰਭਾਲੋ।
2. Replit ਜਾਂ ਕਿਸੇ ਹੋਰ ਭਰੋਸੇਯੋਗ cloud development service ਉੱਤੇ ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ। ਸੇਵਾ ਦੀ ਮੌਜੂਦਾ import/upload ਸਹੂਲਤ ਚੈੱਕ ਕਰੋ; ਜੇ ZIP import ਉਪਲਬਧ ਨਾ ਹੋਵੇ ਤਾਂ GitHub ਰਾਹੀਂ project import ਕਰੋ।
3. Project ਨੂੰ cloud workspace ਵਿੱਚ ਖੋਲ੍ਹ ਕੇ `npm install` ਅਤੇ ਫਿਰ `npm run build` ਚਲਾਓ। Build errors ਆਉਣ ਤਾਂ ਉਨ੍ਹਾਂ ਨੂੰ ਠੀਕ ਕੀਤੇ ਬਿਨਾਂ deploy ਨਾ ਕਰੋ।
4. Supabase project ਬਣਾਓ। Project URL ਅਤੇ publishable/anon key ਨੂੰ hosting ਦੇ Environment Variables ਵਿੱਚ ਪਾਓ। `supabase/schema.sql` ਨੂੰ Supabase SQL Editor ਵਿੱਚ ਚਲਾਓ।
5. AI provider ਦੇ server-side Environment Variables ਵਿੱਚ `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL` ਭਰੋ। Secret key ਨੂੰ chat, screenshot, public code ਜਾਂ browser-side variable ਵਿੱਚ ਨਾ ਪਾਓ।
6. Hosting provider ਤੋਂ preview URL ਲਵੋ ਅਤੇ Login, Signup, AI chat, Tasks ਅਤੇ mobile layout ਦੀ ਜਾਂਚ ਕਰੋ।

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `AI_BASE_URL` (ਉदाहरण: `https://api.openai.com/v1`)
- `AI_API_KEY` (ਗੁਪਤ ਰੱਖੋ)
- `AI_MODEL`
- `NEXT_PUBLIC_SITE_URL` (deploy ਹੋਣ ਤੋਂ ਬਾਅਦ ਅਸਲੀ HTTPS URL)

## Android ਉੱਤੇ PWA ਵਜੋਂ ਜੋੜਨਾ
ਜਦੋਂ Website HTTPS ਉੱਤੇ deploy ਹੋ ਜਾਵੇ, Chrome ਵਿੱਚ ਖੋਲ੍ਹੋ → ⋮ → Add to Home screen / Install app। ਇਹ Website ਨੂੰ home screen ਤੋਂ ਖੋਲ੍ਹੇਗਾ; ਇਹ Play Store ਦੀ native Android app ਨਹੀਂ ਹੈ।

## ਸੁਰੱਖਿਆ
- Supabase `service_role` key ਨੂੰ ਕਦੇ ਵੀ `NEXT_PUBLIC_` variable ਨਾ ਬਣਾਓ।
- AI key ਸਿਰਫ਼ server environment ਵਿੱਚ ਰੱਖੋ।
- Production ਵਿੱਚ ਲਿਆਉਣ ਤੋਂ ਪਹਿਲਾਂ auth redirect URLs, RLS policies, rate limiting, abuse controls, privacy policy, backup ਅਤੇ security audit ਲਾਜ਼ਮੀ ਹਨ।
- Payments ਅਤੇ native Android/iOS apps ਇਸ ਵਰਜਨ ਵਿੱਚ ਹਾਲੇ ਸ਼ਾਮਲ ਨਹੀਂ।


## ਵਰਜਨ 0.5 ਦੀਆਂ ਨਵੀਆਂ ਸਹੂਲਤਾਂ
- ਸਫਲ AI ਜਵਾਬ ਤੋਂ ਬਾਅਦ ਗੱਲਬਾਤ Supabase ਦੇ `conversations` ਅਤੇ `messages` ਟੇਬਲਾਂ ਵਿੱਚ ਸੰਭਾਲਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਹੁੰਦੀ ਹੈ।
- Deploy ਹੋਣ ਤੋਂ ਬਾਅਦ ਆਪਣੀ ਵੈੱਬਸਾਈਟ ਦੇ ਅੰਤ ` /api/health` ਖੋਲ੍ਹ ਕੇ ਵੇਖੋ ਕਿ Supabase ਅਤੇ AI environment variables ਮੌਜੂਦ ਹਨ ਜਾਂ ਨਹੀਂ। ਇਹ ਸਿਰਫ਼ settings ਦੀ ਮੌਜੂਦਗੀ ਜਾਂਚਦਾ ਹੈ, API key ਦੀ ਅਸਲ validity ਨਹੀਂ।
- Chat ਵਿੱਚ “ਪੁਰਾਣੀਆਂ ਗੱਲਾਂ” ਰਾਹੀਂ ਆਪਣੀਆਂ ਆਖ਼ਰੀ 30 ਸੰਭਾਲੀਆਂ ਗੱਲਬਾਤਾਂ ਵੇਖ ਅਤੇ ਮੁੜ ਖੋਲ੍ਹ ਸਕਦੇ ਹੋ।
- Export ਬਟਨ ਨਾਲ ਮੌਜੂਦਾ ਗੱਲਬਾਤ UTF-8 ਟੈਕਸਟ ਫਾਈਲ ਵਜੋਂ ਡਾਊਨਲੋਡ ਕਰ ਸਕਦੇ ਹੋ।
- ਇਹ ਦੋਵੇਂ ਸਹੂਲਤਾਂ ਚਲਾਉਣ ਲਈ Supabase project ਅਤੇ login configuration ਪਹਿਲਾਂ ਸਹੀ ਤਰ੍ਹਾਂ ਚਾਲੂ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।


## v0.6: ਤਸਵੀਰ ਸਮਝਣ ਦੀ ਸਹੂਲਤ
1. Chat ਵਿੱਚ ਤਸਵੀਰ ਵਾਲਾ ਬਟਨ ਦਬਾ ਕੇ JPG, PNG ਜਾਂ WEBP ਚੁਣੋ।
2. ਇੱਕ ਵਾਰ ਵਿੱਚ ਵੱਧ ਤੋਂ ਵੱਧ 3 ਤਸਵੀਰਾਂ ਜੋੜੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ। ਮੋਬਾਈਲ ਬ੍ਰਾਊਜ਼ਰ ਤਸਵੀਰ ਦਾ ਆਕਾਰ ਘਟਾ ਕੇ ਭੇਜਦਾ ਹੈ।
3. ਸਵਾਲ ਲਿਖੋ, ਜਾਂ ਸਵਾਲ ਨਾ ਲਿਖ ਕੇ ਸਿੱਧਾ ਤਸਵੀਰ ਭੇਜੋ।
4. Hosting ਦੇ Server Environment ਵਿੱਚ `AI_MODEL` ਲਈ Vision/Image input ਵਾਲਾ ਮਾਡਲ ਚੁਣੋ। ਸਿਰਫ਼ text-only ਮਾਡਲ ਤਸਵੀਰ ਨਹੀਂ ਸਮਝ ਸਕਦਾ।
5. ਤਸਵੀਰ AI Provider ਨੂੰ ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਭੇਜੀ ਜਾਂਦੀ ਹੈ। ਇਸ ਵਰਜਨ ਵਿੱਚ ਅਸਲ ਤਸਵੀਰ Supabase ਜਾਂ Chat History ਵਿੱਚ ਸਟੋਰ ਨਹੀਂ ਹੁੰਦੀ। ਸੰਵੇਦਨਸ਼ੀਲ ਤਸਵੀਰਾਂ ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ Provider ਦੀ Data Policy ਪੜ੍ਹੋ।


## v0.7: PDF ਅਤੇ Document Reader
1. Dashboard ਵਿੱਚ `PDF ਅਤੇ Document Reader` ਖੋਲ੍ਹੋ।
2. PDF, Word `.docx`, TXT, Markdown ਜਾਂ CSV ਫਾਈਲ ਚੁਣੋ (ਵੱਧ ਤੋਂ ਵੱਧ 12 MB)।
3. ਟੈਕਸਟ extract ਹੋਣ ਤੋਂ ਬਾਅਦ ਭਾਸ਼ਾ ਚੁਣੋ ਅਤੇ ਸਵਾਲ ਲਿਖੋ।
4. `AI ਨੂੰ ਪੁੱਛੋ` ਦਬਾਓ। ਇਸ ਲਈ server ਉੱਤੇ AI provider ਦੀਆਂ ਤਿੰਨ settings ਠੀਕ ਹੋਣੀਆਂ ਲਾਜ਼ਮੀ ਹਨ।
5. Scanned PDF ਜਾਂ ਤਸਵੀਰਾਂ ਵਾਲੇ PDF ਦਾ OCR ਹਾਲੇ ਉਪਲਬਧ ਨਹੀਂ। `.doc` ਨੂੰ `.docx` ਵਿੱਚ ਬਦਲੋ।
6. ਫਾਈਲ server ਉੱਤੇ ਸਥਾਈ ਤੌਰ 'ਤੇ save ਨਹੀਂ ਹੁੰਦੀ। ਸਵਾਲ ਪੁੱਛਣ ਸਮੇਂ ਕੱਢਿਆ ਟੈਕਸਟ ਤੁਹਾਡੇ AI Provider ਨੂੰ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ। ਗੁਪਤ/ਸੰਵੇਦਨਸ਼ੀਲ ਫਾਈਲਾਂ ਲਈ ਆਪਣੀ ਸੰਸਥਾ ਦੀ ਨੀਤੀ ਅਤੇ Provider ਦੀ privacy policy ਜਾਂਚੋ।

## v0.8 Voice Assistant
- Login ਤੋਂ ਬਾਅਦ Dashboard ਵਿੱਚ “Voice Assistant” ਖੋਲ੍ਹੋ.
- Android Chrome ਵਿੱਚ HTTPS website ਵਰਤੋ ਅਤੇ Microphone permission Allow ਕਰੋ.
- ਆਪਣੀ ਬੋਲੀ ਦੀ ਭਾਸ਼ਾ ਚੁਣੋ, Mic ਦਬਾਓ, ਬੋਲੋ ਅਤੇ ਫਿਰ Mic ਬੰਦ ਕਰੋ.
- ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ ਚੈੱਕ ਕਰਕੇ “AI ਨੂੰ ਪੁੱਛੋ” ਦਬਾਓ.
- “ਜਵਾਬ ਸੁਣੋ” ਨਾਲ ਉਪਲਬਧ device voice ਵਿੱਚ ਜਵਾਬ ਸੁਣੋ.
- ਸਾਰੀਆਂ ਭਾਸ਼ਾਵਾਂ ਹਰ ਡਿਵਾਈਸ/ਬ੍ਰਾਊਜ਼ਰ ਉੱਤੇ ਉਪਲਬਧ ਨਹੀਂ ਹੁੰਦੀਆਂ; ਇਹ OS ਅਤੇ browser speech services ਉੱਤੇ ਨਿਰਭਰ ਹੈ.
