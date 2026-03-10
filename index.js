import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = Express();

// ================= MIDDLEWARE =================

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://healthmate-frontend-sepia.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ================= DATABASE CONNECTION =================

// For serverless environments like Vercel
let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) return;

  try {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};

// Ensure DB is connected before request
app.use(async (req, res, next) => {
  await connectDatabase();
  next();
});

// ================= ROUTES =================

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ================= EXPORT FOR VERCEL =================

export default app;

// ================= LOCAL DEVELOPMENT =================

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}