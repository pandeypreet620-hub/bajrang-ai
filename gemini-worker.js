// BAJRANG AI — Gemini API backend for Cloudflare Workers
// Required Cloudflare Worker secret: GEMINI_API_KEY
// Never paste the API key into GitHub or frontend JavaScript.

const ALLOWED_ORIGIN = "https://pandeypreet620-hub.github.io";
const MODEL = "gemini-3.8-flash";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 4000;

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const corsOrigin = origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : "null";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": corsOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Vary": "Origin"
        }
      });
    }

    if (origin && origin !== ALLOWED_ORIGIN) {
      return json({ error: "Origin not allowed." }, 403, "null");
    }
    if (request.method !== "POST") {
      return json({ error: "Use POST /chat." }, 405, corsOrigin);
    }
    if (!env.GEMINI_API_KEY) {
      return json({ error: "AI backend is not configured yet." }, 503, corsOrigin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON request." }, 400, corsOrigin);
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return json({ error: "A messages array is required." }, 400, corsOrigin);
    }

    const messages = body.messages.slice(-MAX_MESSAGES);
    const contents = [];
    for (const item of messages) {
      if (!item || !["user", "assistant"].includes(item.role) ||
          typeof item.content !== "string" ||
          item.content.length === 0 ||
          item.content.length > MAX_MESSAGE_CHARS) {
        return json({ error: "Message format or length is invalid." }, 400, corsOrigin);
      }
      contents.push({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content }]
      });
    }

    const systemInstruction = {
      parts: [{
        text: "You are BAJRANG AI, a helpful personal assistant. Reply naturally and thoughtfully. Match the user's language (Hindi or English). Use the conversation history for context. Be clear, accurate, and age-appropriate. If you are unsure, say so instead of inventing facts. Do not claim to control the user's phone or perform actions you have not actually performed."
      }]
    };

    try {
      const apiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/" +
          MODEL + ":generateContent?key=" + encodeURIComponent(env.GEMINI_API_KEY),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction,
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 700
            }
          })
        }
      );

      const result = await apiResponse.json();
      if (!apiResponse.ok) {
        // Do not return provider details or secrets to the public client.
        return json({
          error: apiResponse.status === 429
            ? "AI usage limit reached. Please try again later."
            : "The AI service could not complete the request."
        }, apiResponse.status === 429 ? 429 : 502, corsOrigin);
      }

      const answer = (result.candidates?.[0]?.content?.parts || [])
        .map(part => part.text || "")
        .join("")
        .trim();

      if (!answer) {
        return json({ error: "The AI returned an empty response." }, 502, corsOrigin);
      }
      return json({ answer }, 200, corsOrigin);
    } catch {
      return json({ error: "Could not reach the AI service. Please try again." }, 502, corsOrigin);
    }
  }
};
