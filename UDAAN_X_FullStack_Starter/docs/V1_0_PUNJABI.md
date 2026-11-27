# UDAAN X v1.0.1 – ਪੰਜਾਬੀ Setup Guide

## ਇਸ ਵਰਜਨ ਵਿੱਚ ਕੀ ਇਕੱਠਾ ਕੀਤਾ ਗਿਆ ਹੈ
- v0.2–v0.9 ਦੇ ਮੌਜੂਦਾ Login, Chat, Image, Document, Voice ਅਤੇ Web Research modules.
- AI Primary/Fallback Router: ਦੋ OpenAI-compatible endpoints ਵਿੱਚ ਪਹਿਲੇ ਦੇ ਫੇਲ੍ਹ ਹੋਣ 'ਤੇ ਦੂਜੇ ਨੂੰ ਅਜ਼ਮਾਉਂਦਾ ਹੈ.
- User-controlled Memory: ਯੂਜ਼ਰ ਖੁਦ ਯਾਦ ਜੋੜ ਸਕਦਾ, ਵੇਖ ਸਕਦਾ ਅਤੇ ਮਿਟਾ ਸਕਦਾ ਹੈ.
- Chat ਅਤੇ Research usage events ਦੀ basic logging.
- Dashboard ਵਿੱਚ Memory entry ਅਤੇ readiness endpoint.

## 1. Supabase Database
1. Supabase ਵਿੱਚ ਆਪਣਾ Project ਖੋਲ੍ਹੋ.
2. SQL Editor ਵਿੱਚ ਪਹਿਲਾਂ `supabase/schema.sql` ਚਲਾਓ (ਜੇ ਪਹਿਲਾਂ ਨਹੀਂ ਚਲਾਇਆ).
3. ਫਿਰ `supabase/migrations/20261124_v1_0.sql` ਚਲਾਓ.
4. `supabase/migrations/20261124_v1_0_1_security_hardening.sql` ਵੀ ਚਲਾਓ। ਇਹ ਆਮ ਯੂਜ਼ਰ ਨੂੰ ਆਪਣੇ ਆਪ Admin ਬਣਨ ਤੋਂ ਰੋਕਦੀ ਹੈ।
5. Authentication ਵਿੱਚ Email sign-in enable ਕਰੋ.
6. ਆਪਣਾ ਪਹਿਲਾ account ਬਣਾਓ. Admin access ਕਿਸੇ ਨੂੰ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ trusted SQL Editor ਰਾਹੀਂ profile role ਬਦਲੋ:
   `update public.profiles set role='admin' where id='AUTH_USER_UUID';`
   UUID ਸਹੀ user ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ. ਕਿਸੇ ਹੋਰ ਨੂੰ admin ਨਾ ਬਣਾਓ.

## 2. AI Provider Keys
Server environment ਵਿੱਚ ਇਹ variables ਭਰੋ:
- `AI_PRIMARY_BASE_URL`
- `AI_PRIMARY_API_KEY`
- `AI_PRIMARY_MODEL`

ਵਿਕਲਪਕ provider ਲਈ:
- `AI_FALLBACK_BASE_URL`
- `AI_FALLBACK_API_KEY`
- `AI_FALLBACK_MODEL`

ਦੋਵੇਂ endpoints ਨੂੰ OpenAI-compatible `/chat/completions` interface support ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ. Native Anthropic ਜਾਂ Google API endpoints ਸਿੱਧੇ compatible ਨਹੀਂ ਮੰਨੇ ਜਾਂਦੇ; ਉਨ੍ਹਾਂ ਲਈ compatible gateway/adapter ਦੀ ਲੋੜ ਹੋ ਸਕਦੀ ਹੈ. Vision ਲਈ primary ਜਾਂ fallback model ਨੂੰ image input support ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ.

ਪੁਰਾਣੇ `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL` variables ਵੀ compatibility ਲਈ ਮੌਜੂਦ ਹਨ.

## 3. Web Research
`TAVILY_API_KEY` server environment ਵਿੱਚ ਭਰੋ. Research ਲਈ AI Primary/Fallback ਵਿੱਚੋਂ ਘੱਟੋ-ਘੱਟ ਇੱਕ provider ਵੀ ਲਾਜ਼ਮੀ ਹੈ.

## 4. Secret ਸੁਰੱਖਿਆ
- API keys ਸਿਰਫ਼ hosting platform ਦੇ server-side Environment Variables ਵਿੱਚ ਦਿਓ.
- `NEXT_PUBLIC_` ਨਾਲ ਕੋਈ secret variable ਨਾ ਬਣਾਓ.
- Chat ਵਿੱਚ API keys, passwords ਜਾਂ service-role key ਨਾ ਭੇਜੋ.
- User-saved memories explicit consent ਨਾਲ ਹੀ store ਹੁੰਦੀਆਂ ਹਨ.

## 5. Local Build / Run
Node.js 20.9+ ਵਰਤੋ.

```bash
npm install
cp .env.example .env.local
# .env.local ਵਿੱਚ ਆਪਣੇ server-side values ਭਰੋ
npm run typecheck
npm run build
npm run start
```

## 6. ਅਜੇ production ਲਈ ਬਾਕੀ ਕੰਮ
ਇਹ v1.0.1 integrated MVP starter ਹੈ, certified production release ਨਹੀਂ. ਹੇਠਲੇ ਕੰਮ ਅਜੇ ਲੋੜੀਂਦੇ ਹਨ:
- Actual credentials ਨਾਲ install, build ਅਤੇ end-to-end tests.
- Rate limiting, abuse protection, CAPTCHA/anti-bot, backups ਅਤੇ monitoring.
- Privacy policy, terms, data retention/deletion workflow ਅਤੇ security audit.
- Payment provider onboarding, signed webhooks, tax/legal review.
- Native Android/iOS build ਅਤੇ Play Store/App Store release.
- Voice provider compatibility testing per language/device.
- Document OCR for scanned PDFs ਅਤੇ file malware scanning.

Payments ਅਤੇ native mobile builds ਇਸ package ਵਿੱਚ live ਨਹੀਂ ਹਨ. `PAYMENTS_ENABLED=false` ਹੀ ਰੱਖੋ.
