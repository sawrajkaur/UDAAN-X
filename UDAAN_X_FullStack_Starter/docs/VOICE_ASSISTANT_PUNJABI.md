# UDAAN X v0.8 — Universal Voice Assistant

## ਕੀ ਸ਼ਾਮਲ ਹੈ
- `/voice` authenticated voice workspace.
- Browser Speech Recognition ਰਾਹੀਂ ਮਾਈਕ੍ਰੋਫੋਨ ਤੋਂ ਬੋਲ ਕੇ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ.
- Browser Speech Synthesis ਰਾਹੀਂ AI ਜਵਾਬ ਪੜ੍ਹਨਾ.
- 29 ਭਾਸ਼ਾ/locale ਚੋਣਾਂ (ਇਹ ਚੋਣ-ਸੂਚੀ ਹੈ, ਹਰ ਡਿਵਾਈਸ ਉੱਤੇ ਕੰਮ ਕਰਨ ਦੀ ਗਾਰੰਟੀ ਨਹੀਂ).
- AI Chat API ਹੁਣ BCP-47 ਵਰਗਾ language/locale string ਲੈਂਦਾ ਹੈ; Punjabi, Hindi ਅਤੇ English ਲਈ ਨਿਰਧਾਰਤ ਭਾਸ਼ਾ-ਹਦਾਇਤ ਹੈ, ਹੋਰ locales ਲਈ ਮਾਡਲ ਨੂੰ ਸੁਨੇਹੇ ਤੋਂ ਭਾਸ਼ਾ ਪਛਾਣ ਕੇ ਜਵਾਬ ਦੇਣ ਲਈ ਕਿਹਾ ਜਾਂਦਾ ਹੈ.

## Android ਉੱਤੇ ਵਰਤੋਂ
1. ਸਾਈਟ HTTPS ਉੱਤੇ ਚੱਲਣੀ ਚਾਹੀਦੀ ਹੈ.
2. Android Chrome ਵਿੱਚ UDAAN X ਖੋਲ੍ਹੋ ਅਤੇ Login ਕਰੋ.
3. Dashboard ਤੋਂ Voice Assistant ਖੋਲ੍ਹੋ.
4. ਭਾਸ਼ਾ ਚੁਣੋ ਅਤੇ ਮਾਈਕ੍ਰੋਫੋਨ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ.
5. ਬੋਲੋ, ਰੁਕਣ ਲਈ ਮਾਈਕ ਬਟਨ ਦਬਾਓ, ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ ਵੇਖੋ/ਸੋਧੋ, ਫਿਰ AI ਨੂੰ ਪੁੱਛੋ.
6. ਜਵਾਬ ਸੁਣਨ ਲਈ “ਜਵਾਬ ਸੁਣੋ” ਦਬਾਓ.

## ਮਹੱਤਵਪੂਰਨ ਸੀਮਾਵਾਂ
- Web Speech API ਦੀ Speech Recognition ਸਹਾਇਤਾ browser ਅਤੇ device ਅਨੁਸਾਰ ਬਦਲਦੀ ਹੈ; ਸਾਰੇ browsers ਜਾਂ languages ਵਿੱਚ ਉਪਲਬਧ ਨਹੀਂ.
- Text-to-Speech ਆਵਾਜ਼ਾਂ operating system/browser ਵਿੱਚ installed voices ਉੱਤੇ ਨਿਰਭਰ ਕਰਦੀਆਂ ਹਨ.
- ਇਹ continuous full-duplex/live voice calling ਨਹੀਂ; ਇਹ push-to-talk → transcript → AI reply → speak flow ਹੈ.
- Punjabi, Hindi ਅਤੇ English ਲਈ explicit AI language instruction ਹੈ. ਹੋਰ ਭਾਸ਼ਾਵਾਂ ਦੀ ਗੁਣਵੱਤਾ configured AI model ਉੱਤੇ ਨਿਰਭਰ ਕਰੇਗੀ.
- API key ਅਤੇ Supabase configuration ਬਿਨਾਂ AI answer ਜਾਂ authenticated page ਨਹੀਂ ਚੱਲੇਗਾ.
- Mic transcription browser/device speech service ਰਾਹੀਂ ਹੋ ਸਕਦੀ ਹੈ; browser vendor ਦੀ privacy policy ਲਾਗੂ ਹੁੰਦੀ ਹੈ. Transcript AI server/provider ਨੂੰ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ.

## Server configuration
ਪਹਿਲਾਂ ਵਾਲੇ `.env` variables ਲਾਜ਼ਮੀ ਹਨ: `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## ਅਗਲੀ ਜਾਂਚ
- Android Chrome ਅਤੇ iOS Safari ਵਿੱਚ microphone permission.
- ਪੰਜਾਬੀ, ਹਿੰਦੀ, ਅੰਗਰੇਜ਼ੀ speech recognition.
- TTS voice availability per locale.
- Configured AI provider ਵੱਲੋਂ Punjabi ਅਤੇ multilingual output.
- Production build ਅਤੇ security review.
