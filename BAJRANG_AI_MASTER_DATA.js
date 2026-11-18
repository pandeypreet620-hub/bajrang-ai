/*
 * BAJRANG AI — MASTER PROJECT DATA
 * Repository: pandeypreet620-hub/bajrang-ai
 * Branch: main
 *
 * This file is the single, safe-to-share project reference for BAJRANG AI.
 * It contains project facts and local demo replies; it is NOT a generative AI model.
 * Never put passwords, OTPs, API tokens, private keys, or billing data in this file.
 */
(function (root) {
  "use strict";

  const BAJRANG_AI_MASTER_DATA = {
    project: {
      name: "BAJRANG AI",
      type: "Personal Assistant website / lightweight phone companion",
      owner: "Preet Pandey",
      village: "Bramankhedi",
      aiDevelopmentAssistant: "ChatGPT (GPT-6)",
      repository: "https://github.com/pandeypreet620-hub/bajrang-ai",
      website: "https://pandeypreet620-hub.github.io/bajrang-ai/home.html",
      homePage: "https://pandeypreet620-hub.github.io/bajrang-ai/",
      languages: ["Hindi", "English"],
      visualTheme: "Premium dark blue and gold"
    },

    targetDevice: {
      model: "Samsung Galaxy J7 Max",
      androidVersion: "Android 8.1",
      constraints: [
        "Keep pages lightweight and responsive.",
        "Keep CPU, RAM, battery, and temperature use as low as practical.",
        "Do not assume a desktop computer is available.",
        "Do not assume that all modern browser APIs are supported."
      ]
    },

    websiteFeatures: {
      homeDashboard: "Main dashboard and navigation.",
      aiChat: {
        status: "Local demo / keyword-based replies unless a backend is explicitly configured.",
        limitation: "This is not ChatGPT and cannot answer every open-ended question.",
        backendEndpointConfigured: false
      },
      voiceAssistant: {
        status: "Uses browser speech features when supported.",
        limitation: "Microphone and speech recognition support depends on the browser and permissions."
      },
      notes: {
        storage: "Browser localStorage on this device/browser.",
        limitation: "Notes may not sync to other devices; clearing browser data may remove them."
      },
      reminders: {
        storage: "Browser localStorage.",
        limitation: "Reminders only work while the page/session is open; this is not a guaranteed background alarm."
      },
      phoneTools: {
        status: "Displays only basic device/browser information exposed by the browser.",
        limitation: "A website cannot silently control all Android settings, calls, SMS, or other apps."
      },
      settings: "Language and website preferences.",
      aboutAndPrivacy: "Project information and basic privacy explanations."
    },

    technicalFiles: {
      "index.html": "Main entry page / website shell.",
      "home.html": "Main dashboard and website features.",
      "manifest.webmanifest": "Installable web-app metadata, if supported.",
      "sw.js": "Service-worker caching for supported browsers.",
      "icon.svg": "Website icon.",
      "worker.js": "Optional Cloudflare Worker backend experiment; it is not connected to the website unless a deployed URL is configured."
    },

    currentStatus: {
      hosting: "GitHub Pages",
      hostingUrl: "https://pandeypreet620-hub.github.io/bajrang-ai/home.html",
      freeStaticHosting: "GitHub Pages can host the website's static files within GitHub's current plan and usage rules.",
      generativeAiEngine: "Not connected",
      cloudflare: "Optional backend experiment only. Do not deploy or enable paid services without the account holder reviewing price, quota, and terms.",
      apiUrlInFrontend: "Blank placeholder until a backend has been deployed and reviewed.",
      importantTruth: "GitHub Pages alone does not run a large language model or provide ChatGPT-level answers."
    },

    developmentRules: [
      "Do not claim that a feature works until it has been tested on the target phone.",
      "Do not claim full Android phone control from a normal website.",
      "Do not add paid services without clear approval from the account holder/guardian.",
      "Never expose API keys, passwords, OTPs, private tokens, or billing details in frontend code.",
      "Keep the existing dark blue and gold design unless the owner asks for a redesign.",
      "Preserve Hindi and English support.",
      "Avoid heavy scripts and unnecessary background activity."
    ],

    nextSteps: [
      "Test the current GitHub Pages website on the Samsung Galaxy J7 Max.",
      "Check navigation, Hindi/English switch, notes, reminders, and speech support separately.",
      "Keep chat clearly labelled as local demo until a safe AI backend is genuinely connected.",
      "Only consider an external AI backend after checking current free quotas, usage limits, and billing terms with a parent/guardian.",
      "If no suitable free backend is available, keep the website as a lightweight assistant rather than promising unrestricted ChatGPT-like answers."
    ],

    localReplies: {
      hi: {
        "hello": "नमस्ते! मैं BAJRANG AI का स्थानीय डेमो सहायक हूँ।",
        "namaste": "नमस्ते! बताइए, क्या मदद चाहिए?",
        "founder": "BAJRANG AI के Founder Preet Pandey हैं। गाँव: Bramankhedi। AI Development Assistant: ChatGPT (GPT-6)।",
        "who are you": "मैं BAJRANG AI वेबसाइट का स्थानीय डेमो सहायक हूँ।",
        "help": "मैं अभी वेबसाइट के उपलब्ध स्थानीय डेमो फीचर्स और सेव की गई जानकारी में मदद कर सकता हूँ।"
      },
      en: {
        "hello": "Hello! I am the local demo assistant for BAJRANG AI.",
        "founder": "The founder of BAJRANG AI is Preet Pandey. Village: Bramankhedi. AI Development Assistant: ChatGPT (GPT-6).",
        "who are you": "I am the local demo assistant on the BAJRANG AI website.",
        "help": "I can help with the website's available local demo features and saved information."
      }
    },

    getLocalReply: function (message, language) {
      const text = String(message || "").trim().toLowerCase();
      const lang = language === "en" ? "en" : "hi";
      const replies = this.localReplies[lang];

      if (!text) {
        return lang === "en" ? "Please type a message." : "कृपया अपना संदेश लिखें।";
      }

      if (/founder|founder kon|founder कौन|संस्थापक|फाउंडर|owner|मालिक/.test(text)) {
        return replies.founder;
      }
      if (/who are you|tum kaun|तुम कौन|आप कौन|कौन हो/.test(text)) {
        return replies["who are you"];
      }
      if (/help|मदद|सहायता/.test(text)) {
        return replies.help;
      }
      if (/hello|hi|नमस्ते|नमस्कार|राम राम/.test(text)) {
        return replies.hello || replies.namaste;
      }

      return lang === "en"
        ? "The online AI engine is not connected yet. I can only answer a small set of built-in demo questions."
        : "ऑनलाइन AI इंजन अभी कनेक्ट नहीं है। अभी मैं केवल कुछ पहले से जोड़े गए डेमो सवालों का जवाब दे सकता हूँ।";
    }
  };

  // Expose read-only project data for optional future website integration.
  Object.freeze(BAJRANG_AI_MASTER_DATA.project);
  Object.freeze(BAJRANG_AI_MASTER_DATA.targetDevice);
  root.BAJRANG_AI_MASTER_DATA = BAJRANG_AI_MASTER_DATA;
})(typeof window !== "undefined" ? window : globalThis);
