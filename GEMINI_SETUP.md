# BAJRANG AI — Gemini backend (prepared, not activated)

This repository contains a Cloudflare Worker backend for Gemini. It is intentionally **not active yet**.

## Files
- `gemini-worker.js`: backend code.
- `home.html` and `index.html`: website frontend. Their `AI_API_URL` is still blank, so the site continues in local demo mode.

## Before activation
An adult account holder/guardian should review Google's current API terms, privacy/data-use rules, free-tier availability and quotas. Free access is limited and can change. Do not enable paid billing just to test this.

## Later activation checklist
1. Create/deploy a Cloudflare Worker using the contents of `gemini-worker.js`.
2. In the Worker settings, add a **Secret** named `GEMINI_API_KEY`. Add the key through Cloudflare's secret interface only. Never put it in GitHub, HTML, JavaScript, chat, or screenshots.
3. Test the Worker endpoint with a POST request to `/chat` using JSON: `{"messages":[{"role":"user","content":"नमस्ते"}]}`.
4. Only after a successful test, set `AI_API_URL` in both `home.html` and `index.html` to the Worker URL ending in `/chat`.
5. Test the website and check usage limits.

## Important
- Model configured: `gemini-3.8-flash`. Model access and free-tier limits are controlled by Google and may change.
- This backend does not guarantee unlimited free use.
- Public Worker traffic can consume the project's quota. Add rate limiting/abuse controls before public launch.
- CORS is restricted to the GitHub Pages origin, but CORS alone is not authentication or abuse protection.
- Do not send private or sensitive information to the AI service.
- GitHub Pages by itself cannot run the AI model; the Worker is the backend.
