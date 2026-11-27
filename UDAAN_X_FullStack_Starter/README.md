# UDAAN X by VYORA AI — Integrated MVP v1.0.1

Multilingual AI workspace foundation built with Next.js, React, TypeScript and Supabase. Includes authentication pages, protected dashboard, server-side AI gateway, task management, persistent conversations, conversation history, plain-text export, initial database schema and Android/PWA guidance.

## Current capabilities
- Responsive landing, sign-up and sign-in UI
- Supabase-authenticated dashboard
- Server-side OpenAI-compatible chat gateway
- Punjabi (Gurmukhi), Hindi and English response preference
- Basic user task management
- Supabase schema with row-level security policies for user-owned data
- Save successful chat turns to the signed-in user's account
- Browse and reopen the latest 30 saved conversations
- Export the current conversation as a UTF-8 text file
- Attach up to three JPG/PNG/WEBP images to a chat turn; images are resized in the browser before sending
- Send images to a vision-capable OpenAI-compatible model for visual understanding
- Show image previews in the active chat; image bytes are not retained in conversation history
- PWA manifest for install-to-home-screen after HTTPS deployment

- PDF, DOCX, TXT, Markdown and CSV text extraction for signed-in users (files processed temporarily; not stored)
- Ask AI questions about extracted document text in Punjabi, Hindi or English
- Authenticated Web Research page with Tavily search, AI-generated multilingual reports, numbered inline source markers, source links and TXT export

## Not yet included / not production-ready
Native Android/iOS builds, payments, persistent image storage, OCR for scanned PDFs, native `.doc` parsing, full memory controls, production rate limiting, formal privacy/compliance review, penetration testing and deployment. Web research is an initial integration and still needs provider credentials, rate limits and source-quality testing.

## Setup
See `docs/SETUP_PUNJABI.md` and `docs/ANDROID_SETUP_PUNJABI.md`. Never put secret API keys in browser code or commit them to the repository. Configure secrets only in server-side environment variables.

## Image understanding setup (v0.6)
- Set `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` on the server/hosting provider. `AI_MODEL` must support image input (vision) and the provider must accept OpenAI-compatible `chat/completions` image URL content.
- The chat accepts up to 3 images per turn. Supported input formats: JPEG, PNG and WEBP. Browser-side processing resizes images to JPEG before sending.
- Image data is sent to the configured AI provider for the request. This version does **not** upload image bytes to Supabase Storage or retain them in conversation history; history records only a note that images were attached. Check your AI provider's data-retention terms before sending sensitive images.
- This feature is not an OCR guarantee. Image quality, handwriting, language, model capability and provider limits affect results.


## v0.7 PDF and Document Reader
- Open `/documents` from the signed-in dashboard.
- Upload PDF, DOCX, TXT, MD or CSV files up to 12 MB. PDF extraction is limited to the first 80 pages and extracted text is capped at 40,000 characters.
- Ask questions about the extracted text through the configured server-side AI provider.
- Uploaded files are processed in memory and are not saved to Supabase Storage. Extracted text is sent to your configured AI provider only when you submit a question.
- Scanned/image-only PDFs require OCR and are not supported in this release. Legacy `.doc` files must be converted to `.docx`.
- Install dependencies with `npm install` after updating the package manifest.


## Web Research setup (v0.9)
- Create a Tavily account and add `TAVILY_API_KEY` to the server-side environment.
- Keep `AI_BASE_URL`, `AI_API_KEY`, and `AI_MODEL` configured for report synthesis.
- Open `/research` after signing in. Choose Punjabi, Hindi or English and basic/advanced search depth.
- The server retrieves up to six search results and sends their extracts to the AI model. The report displays numbered source links and can be copied or exported as TXT.
- Search snippets may be incomplete or outdated. Open and verify important sources. This is not exhaustive research and citations still require human checking.
- Add production rate limiting, quotas, abuse monitoring and privacy review before public launch.


## v1.0 integrated MVP update

See [`docs/V1_0_PUNJABI.md`](docs/V1_0_PUNJABI.md) for the Punjabi setup guide. This release adds primary/fallback AI routing for OpenAI-compatible endpoints, consent-based user memory, basic usage-event logging, and a v1.0 database migration. Payments and native mobile app builds remain disabled/not included.


## v1.0.1 security hardening
- The profile table now grants authenticated users column-level update access only to `display_name`, `preferred_language` and `updated_at`. Users cannot promote themselves to admin by changing `role`.
- Run `supabase/migrations/20261124_v1_0_1_security_hardening.sql` after the v1.0 migration.
- This is a security improvement, not a substitute for a full independent security review.


## Supabase fresh setup v1.0.2
For a new project, run `supabase/SETUP_ALL.sql` once. Android instructions: `docs/SUPABASE_SETUP_ANDROID_PUNJABI.md`. This consolidated script matches the app's existing table names and columns.
