# UDAAN X ਨੂੰ ਚਲਾਉਣ ਦੀ ਪੰਜਾਬੀ ਗਾਈਡ

## ਪਹਿਲਾਂ ਕੀ ਚਾਹੀਦਾ ਹੈ
- ਕੰਪਿਊਟਰ (Windows/Mac/Linux) — ਪਹਿਲੀ ਵਾਰ project setup ਮੋਬਾਈਲ ਨਾਲੋਂ ਕੰਪਿਊਟਰ 'ਤੇ ਆਸਾਨ ਹੈ।
- Node.js 20 ਜਾਂ ਇਸ ਤੋਂ ਨਵਾਂ
- Supabase ਖਾਤਾ
- AI provider ਦਾ API ਖਾਤਾ (ਇਹ ਬਾਅਦ ਵਿੱਚ ਵੀ ਜੋੜ ਸਕਦੇ ਹੋ)

## ਕਦਮ 1 — ZIP ਖੋਲ੍ਹੋ
ZIP ਨੂੰ Extract ਕਰੋ। Project folder ਦੇ ਅੰਦਰ Terminal/Command Prompt ਖੋਲ੍ਹੋ।

## ਕਦਮ 2 — Dependencies
```bash
npm install
```

## ਕਦਮ 3 — Environment file
`.env.example` ਦੀ ਕਾਪੀ ਬਣਾਕੇ `.env.local` ਨਾਮ ਰੱਖੋ। Supabase Project Settings → API ਤੋਂ Project URL ਅਤੇ anon/public key ਭਰੋ।

**Service role key browser ਵਿੱਚ ਕਦੇ ਨਾ ਪਾਓ।** ਇਸ starter ਵਿੱਚ ਇਸ ਦੀ ਲੋੜ ਨਹੀਂ।

## ਕਦਮ 4 — Database
Supabase → SQL Editor ਖੋਲ੍ਹੋ ਅਤੇ `supabase/schema.sql` ਦੀ ਸਮੱਗਰੀ Run ਕਰੋ।

## ਕਦਮ 5 — AI Provider
ਆਪਣੇ provider ਦੀ official dashboard ਤੋਂ API key ਲਵੋ। `.env.local` ਵਿੱਚ:
- `AI_BASE_URL`
- `AI_API_KEY`
- `AI_MODEL`

ભરો. API key માત્ર server પર જ રહેવી ਚਾਹੀਦੀ ਹੈ; GitHub ਜਾਂ ਕਿਸੇ screenshot ਵਿੱਚ share ਨਾ ਕਰੋ।

## ਕਦਮ 6 — Local run
```bash
npm run dev
```
Browser ਵਿੱਚ `http://localhost:3000` ਖੋਲ੍ਹੋ।

## ਕਦਮ 7 — Production deployment
ਇੱਕ HTTPS hosting provider 'ਤੇ deploy ਕਰੋ, environment variables ਸੈੱਟ ਕਰੋ ਅਤੇ Supabase Auth ਵਿੱਚ production redirect URL ਜੋੜੋ।

## ਅਹਿਮ ਹੱਦਾਂ
ਇਹ full-stack starter ਹੈ, production-certified finished product ਨਹੀਂ। Payment processing, native iOS/Android store builds, OCR, live web research, voice output, full memory UI ਅਤੇ independent security audit ਅਜੇ implement/verify ਕਰਨੇ ਬਾਕੀ ਹਨ। Production ਵਿੱਚ ਅਸਲੀ ਗਾਹਕਾਂ ਦੇ sensitive documents ਨਾ ਲਵੋ ਜਦ ਤੱਕ privacy, retention, access control ਅਤੇ security audit ਪੂਰੇ ਨਾ ਹੋਣ।
