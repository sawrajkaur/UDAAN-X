# UDAAN X changelog

## 0.6.0 - Image upload and understanding
- Added mobile-friendly image picker for JPEG, PNG and WEBP.
- Added client-side image resizing and preview; up to three images per turn.
- Extended the authenticated chat API to send image data URLs as multimodal messages to a vision-capable OpenAI-compatible model.
- Added server-side MIME, payload-size and image-count validation.
- Image bytes are transient and are not persisted to Supabase; history stores a textual attachment note only.
- Added Punjabi Android setup notes and provider-compatibility guidance.

## 0.5.0 - Conversation history and export
- Added authenticated API to list the signed-in user's latest 30 conversations.
- Added an authenticated API to load messages from one owned conversation.
- Added a Punjabi conversation-history panel to the chat UI.
- Added plain-text chat export from the browser.
- History endpoints enforce authentication and user ownership; responses are marked no-store.

## 0.4.0 - Conversation persistence and readiness
- Added an authenticated chat persistence flow using the existing Supabase conversations and messages tables.
- Chat responses return a conversation ID and whether the turn was saved.
- Added `/api/health` to show whether Supabase and AI environment variables are present without exposing secret values.

## Known limitations
- No provider key or Supabase project is bundled. Configure them in the hosting provider's server-side environment.
- `/api/health` checks configuration presence only; it does not verify credentials or external connectivity.
- Persistent file/image storage, voice, live web search, payments, native Android/iOS builds, and production security review are not included yet.
- Production build and live integration tests still need to be run in a connected cloud workspace.


## v0.7.0 — PDF and Document Reader
- Added authenticated document text extraction endpoint for PDF, DOCX, TXT, Markdown and CSV.
- Added a document question-answer endpoint using the server-side AI provider.
- Added responsive Document Reader page and dashboard entry point.
- Added file size/type checks, text length cap, no persistent file storage, and clear scanned-PDF OCR limitation.


## v0.8.0 — Multilingual Voice Assistant
- Added authenticated `/voice` page and dashboard entry point.
- Added browser-based push-to-talk speech recognition and spoken AI responses.
- Added a locale picker covering 29 language/locale options.
- Expanded chat API language field to accept locale tags and infer response language for non-preset locales.
- Added Punjabi setup and compatibility notes in `docs/VOICE_ASSISTANT_PUNJABI.md`.
- Limitation: browser/OS speech support varies; this is not continuous full-duplex voice.

## v0.9.0 – Web Research AI
- Added authenticated `/research` page and dashboard entry.
- Added server-side Tavily web search with basic/advanced depth and a six-result cap.
- Added AI synthesis constrained to retrieved extracts, inline numbered citations, source links and published dates when supplied.
- Added plain-text report export and copy controls.
- Added `TAVILY_API_KEY` server environment setting.
- Search and AI requests are server-side; API keys are never sent to the browser.

## v1.0.0 – Integrated MVP foundation
- Integrated existing chat, image, document, voice and research entry points into the v1.0 workspace.
- Added primary/fallback AI provider routing for OpenAI-compatible chat-completions endpoints.
- Added user-consented memory management API and UI, with per-user access through Supabase RLS.
- Added basic usage-event logging and v1.0 SQL migration/indexes.
- Added Punjabi setup documentation and explicit production-readiness limitations.
- Payments remain disabled; native Android/iOS binaries are not included.

## v1.0.1
- Restricted authenticated profile updates to safe columns so users cannot self-assign admin role.
- Added Punjabi security checklist and updated setup instructions.
