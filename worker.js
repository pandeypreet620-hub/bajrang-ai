const ALLOWED_ORIGIN = "https://pandeypreet620-hub.github.io";
const MODEL = "@cf/zai-org/glm-4.7-flash";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (origin !== ALLOWED_ORIGIN) {
      return Response.json({ error: "Origin not allowed" }, { status: 403, headers });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/chat") {
      return Response.json({ error: "Use POST /chat" }, { status: 404, headers });
    }

    if (!env.AI) {
      return Response.json({ error: "Workers AI binding named AI is not configured." }, { status: 503, headers });
    }

    try {
      const raw = await request.text();
      if (raw.length > 12000) {
        return Response.json({ error: "Message is too long." }, { status: 413, headers });
      }

      const body = JSON.parse(raw);
      const incoming = Array.isArray(body.messages) ? body.messages : [];
      const messages = incoming
        .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
        .slice(-8)
        .map(m => ({ role: m.role, content: m.content.slice(0, 1800) }));

      if (!messages.length || !messages.some(m => m.role === "user")) {
        return Response.json({ error: "Please enter a message." }, { status: 400, headers });
      }

      const result = await env.AI.run(MODEL, {
        messages: [
          {
            role: "system",
            content: "You are BAJRANG AI, a general-purpose AI personal assistant. Answer a wide range of general questions, explain topics, help with learning, writing, reasoning, everyday information, and technology—not only questions about this website. Reply naturally in the language used by the user, especially clear, natural Hindi or English. For Hindi, use simple everyday Hindi, correct grammar, short sentences, and Devanagari script when appropriate. Be accurate, helpful, and concise; explain step by step when useful. If unsure or information may be current, say what you do not know instead of inventing facts. Keep all replies age-appropriate and safe for a teenage user. BAJRANG AI founder and project creator: Preet Pandey (प्रीत पांडेय). Founder village: Bramankhedi (बामनखेड़ी). ChatGPT (GPT-6) helped Preet Pandey with planning, coding guidance, improvements, and development support for the BAJRANG AI project; do not claim ChatGPT alone created or owns BAJRANG AI. If asked who made BAJRANG AI, clearly say Preet Pandey is its founder and creator, with development assistance from ChatGPT (GPT-6). Do not claim to control the user's phone or access private data."
          },
          ...messages
        ],
        max_tokens: 350
      });

      const answer = result && (result.response || result.output_text);
      if (!answer) {
        return Response.json({ error: "The AI model returned no text." }, { status: 502, headers });
      }

      return Response.json({ answer }, { headers });
    } catch (error) {
      return Response.json({ error: "AI request failed. Please try again later." }, { status: 500, headers });
    }
  }
};