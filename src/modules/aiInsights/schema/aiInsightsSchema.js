import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
      unique: true, // ensures 1-to-1 relation
      index: true,
    },

    summaryEnglish: {
      type: String,
      required: true,
      trim: true,
    },

    summaryRomanUrdu: {
      type: String,
      required: true,
      trim: true,
    },

    abnormalValues: [
      {
        type: String,
        trim: true,
      },
    ],

    doctorQuestions: [
      {
        type: String,
        trim: true,
      },
    ],

    dietSuggestions: [
      {
        type: String,
        trim: true,
      },
    ],

    homeRemedies: [
      {
        type: String,
        trim: true,
      },
    ],

    disclaimer: {
      type: String,
      default:
        "AI is for understanding only, not medical advice. Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.",
    },

    aiModelUsed: {
      type: String, // e.g. Gemini 1.5 Pro
    },

    processingTimeMs: {
      type: Number, // optional performance tracking
    },
  },
  { timestamps: true }
);

const AiInsight = mongoose.model("AiInsight", aiInsightSchema);

export default AiInsight;