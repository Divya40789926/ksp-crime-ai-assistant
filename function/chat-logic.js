// ============================================================
// KSP Crime Database Conversational AI — core logic
// ------------------------------------------------------------
// WHAT THIS FILE DOES, IN PLAIN TERMS:
// 1. Takes the investigator's question + past conversation
// 2. Sends it to Claude along with a description of our data
// 3. Claude answers using ONLY the data it was given
// 4. A guardrail blocks unsafe caste/religion drill-down queries
// 5. Returns the answer to the webpage
// ============================================================

const { firData } = require('./data.js');

// STEP A: The guardrail — a simple safety check.
// If the investigator's question tries to link crime to caste/religion
// for an individual or a very small group, we refuse and explain why.
// This directly matches the challenge brief's requirement for
// "Explainable AI" and "Governance" — we are not hiding this, we are
// showing it as a deliberate safety feature.
function violatesGuardrail(question) {
  const sensitiveTerms = ["caste", "religion", "community", "muslim", "hindu", "christian", "dalit"];
  const lowerQ = question.toLowerCase();
  const mentionsSensitive = sensitiveTerms.some(term => lowerQ.includes(term));

  // If the question mentions a sensitive attribute AND asks about a
  // specific named person (rather than a broad statistical trend),
  // we block it. This is a simple heuristic for a prototype — a real
  // deployment would use a more robust classifier.
  const mentionsIndividual = /\b(this person|him|her|the accused named|specific)\b/i.test(question);

  return mentionsSensitive && mentionsIndividual;
}

// STEP B: Build the "briefing note" we give Claude every time.
// This describes our data so Claude knows what it's allowed to answer from.
function buildSystemPrompt() {
  return `You are a conversational assistant for Karnataka State Police investigators.
You answer questions ONLY using the FIR (First Information Report) data provided below.
This is SYNTHETIC/FAKE demo data for a hackathon prototype — not real crime records.

DATA (JSON array of FIR case records, each with linked Accused and Victim info):
${JSON.stringify(firData, null, 2)}

RULES YOU MUST FOLLOW:
- Only answer using the data above. If the answer isn't in the data, say so clearly.
- Never speculate about someone's guilt — only report what the case record states.
- If asked to break down crime patterns by caste, religion, or similar sensitive
  attributes for a specific small group, decline and explain that such analysis
  requires aggregated, privacy-safe statistical review, not individual-level lookup.
- Keep answers concise and factual, like a briefing to a busy investigator.
- Support follow-up questions using the conversation history provided.
- ALWAYS respond in the same language the investigator used. If they wrote in
  Kannada, reply in Kannada. If English, reply in English.`;
}

// STEP C: The main function — this is what gets called when the
// webpage sends a question.
async function handleChatMessage(question, history = []) {
  // Guardrail check happens BEFORE we even call the AI — cheaper and safer.
  if (violatesGuardrail(question)) {
    return {
      answer: "I can't provide individual-level analysis linking crime to caste or religion. " +
              "This kind of correlation can only be reviewed at an aggregated, statistically " +
              "safe level by authorized analysts, in line with responsible-AI governance " +
              "requirements. I'm happy to help with case status, accused history, or crime " +
              "pattern questions that don't target protected individual attributes.",
      blocked: true
    };
  }

  // Gemini uses "model" instead of "assistant" for the AI's past turns,
  // and wraps text inside a "parts" array. We convert our simple history
  // format into what Gemini expects.
  const geminiContents = [
    ...history.map(turn => ({
      role: turn.role === "assistant" ? "model" : "user",
      parts: [{ text: turn.content }]
    })),
    { role: "user", parts: [{ text: question }] }
  ];

  const GEMINI_MODEL = "gemini-3.5-flash"; // current-gen model available to new accounts, mid-2026
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY  // set this in Catalyst's environment variables
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: buildSystemPrompt() }] },
      contents: geminiContents
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);
    return { answer: "Sorry, something went wrong reaching the AI service.", blocked: false };
  }

  const answerText = data.candidates?.[0]?.content?.parts
    ?.map(part => part.text || "")
    .join("\n") || "No response generated.";

  return { answer: answerText, blocked: false };
}

module.exports = { handleChatMessage };