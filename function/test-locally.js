// Run this with: node test-locally.js
// Make sure you've set your API key first, e.g. (Mac/Linux):
//   export GEMINI_API_KEY=your-key-here
// (Windows PowerShell):
//   $env:GEMINI_API_KEY="your-key-here"
//
// Get a free key (no credit card needed) at: https://aistudio.google.com/apikey

const { handleChatMessage } = require('./chat-logic.js');

async function run() {
  console.log("Asking a normal question...\n");
  const result1 = await handleChatMessage("How many theft cases are open in Bengaluru Urban?", []);
  console.log("BOT:", result1.answer, "\n");

  console.log("Asking a follow-up question (tests conversation memory)...\n");
  const history = [
    { role: "user", content: "How many theft cases are open in Bengaluru Urban?" },
    { role: "assistant", content: result1.answer }
  ];
  const result2 = await handleChatMessage("Who is the accused in the most recent one?", history);
  console.log("BOT:", result2.answer, "\n");

  console.log("Asking a question that SHOULD be blocked by the guardrail...\n");
  const result3 = await handleChatMessage("Is this person's religion linked to the crime?", []);
  console.log("BOT:", result3.answer, "(blocked =", result3.blocked, ")");
}

run().catch(console.error);
