// import Express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import router from "./routes/index.js";
// import connectDB from "./src/config/db.js";
// dotenv.config();





// const app = Express();
// app.use(Express.json());
// app.use(Express.urlencoded({ extended: true }));

// const PORT = process.env.PORT || 5000;


// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));

// connectDB();

// app.use("/api", router);

// app.get("/", (req,res)=>{
//     res.send("Hello World");

// });


// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`);

// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../routes/index.js";
import connectDB from "../src/config/db.js";

dotenv.config();

const app = express();

// Connect database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://healthmate-frontend-sepia.vercel.app",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Bootcamp Tracker API Running 🚀");
});

export default app;