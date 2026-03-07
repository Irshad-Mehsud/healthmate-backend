import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String, // Cloudinary public_id (for deletion)
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "image"],
      required: true,
    },

    reportType: {
      type: String, 
      required: true,
      trim: true,
    },

    reportDate: {
      type: Date,
      required: true,
    },

    aiInsight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AiInsight",
      default: null,
    },

    aiStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Compound index for faster timeline queries
reportSchema.index({ user: 1, reportDate: -1 });

export default mongoose.model("Report", reportSchema);