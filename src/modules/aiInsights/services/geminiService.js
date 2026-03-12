import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const analyzeWithGemini = async (fileUrl) => {
  try {
    const prompt = `
You are a medical AI assistant.

A medical report image is located at this URL:
${fileUrl}

You cannot open URLs, so assume the medical values are provided in the report.

Respond with ONLY a valid JSON object. No explanation, no markdown, no extra text.

Use this exact structure:

{
  "summaryEnglish": "A clear 2-3 sentence summary of the report findings in English.",
  "summaryRomanUrdu": "Usi report ki 2-3 jumlon mein summary Roman Urdu mein.",
  "abnormalValues": ["example: Hemoglobin: 8.5 g/dL (Low)"],
  "doctorQuestions": ["3-5 questions the patient should ask their doctor"],
  "dietSuggestions": ["3-5 diet suggestions based on the report"],
  "homeRemedies": ["2-4 safe home remedies relevant to the findings"]
}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const textResponse = response.choices[0]?.message?.content;
    console.log("Groq raw response:", textResponse);

    if (!textResponse) {
      throw new Error("Invalid AI response");
    }

    // Clean markdown if model returns it
    const cleaned = textResponse
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Could not parse AI response as JSON");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.summaryEnglish || !parsed.summaryRomanUrdu) {
      throw new Error("AI returned incomplete data. Please try again.");
    }

    return parsed;

  } catch (error) {
    console.error("Groq Error:", error.message);

    if (error.status === 429 || error.message?.includes("429")) {
      const retryMatch = error.message?.match(/(\d+(\.\d+)?)s/);
      const retryAfter = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : 60;

      const quotaError = new Error("Groq quota exceeded. Please try again later.");
      quotaError.status = 429;
      quotaError.retryAfter = retryAfter;

      throw quotaError;
    }

    throw new Error("Groq Analysis Failed: " + error.message);
  }
};

export { analyzeWithGemini };