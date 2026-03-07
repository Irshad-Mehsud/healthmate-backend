import Report from "../../reports/schema/reportSchema.js";
import AiInsight from "../schema/aiInsightsSchema.js";
import { analyzeWithGemini } from "./geminiService.js";

const generateAiInsight = async (reportId) => {
  try {
    const report = await Report.findById(reportId);
    if (!report) throw new Error("Report not found");

    // Update status → pending
    report.aiStatus = "pending";
    await report.save();

    const startTime = Date.now();

    console.log("Report url for AI processing:", report.fileUrl);
    // 🔥 Call Gemini
    const aiResult = await analyzeWithGemini(report.fileUrl);

    const processingTime = Date.now() - startTime;

    // Save AI insight
    const aiInsight = await AiInsight.create({
      report: report._id,
      summaryEnglish: aiResult.summaryEnglish,
      summaryRomanUrdu: aiResult.summaryRomanUrdu,
      abnormalValues: aiResult.abnormalValues,
      doctorQuestions: aiResult.doctorQuestions,
      dietSuggestions: aiResult.dietSuggestions,
      homeRemedies: aiResult.homeRemedies,
      aiModelUsed: "Groq Llama 4 Maverick",
      processingTimeMs: processingTime,
    });

    // Link report → aiInsight
    report.aiInsight = aiInsight._id;
    report.aiStatus = "completed";
    await report.save();

    return aiInsight;

  } catch (error) {
    await Report.findByIdAndUpdate(reportId, {
      aiStatus: "failed",
    });

    if (error.status === 429) {
      throw error;
    }

    throw new Error("AI Processing Failed: " + error.message);
  }
};

const getInsightsService = async (reportId) => {
  try {
    const insight = await AiInsight.findOne({ report: reportId });
    return insight;
  } catch (error) {
    throw new Error("Fetching AI Insight Failed: " + error.message);
  }
};





export {
    generateAiInsight,
    getInsightsService
}