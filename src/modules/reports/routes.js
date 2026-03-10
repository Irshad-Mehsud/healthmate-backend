import Router from "express";
import multer from "multer";
import {uploadReportController,getUserReportsController,getSingleReportController,deleteReportController,saveReportAnalysisController,getReportDetailsController} from "./controllers/allControllers.js";
import upload from "../uploads/middleware/multer.js";
// import getUserReportsController from "./controllers/getUserReportsController.js";
// import getSingleReportController from "./controllers/getSingleReportController.js";
// import deleteReportController from "./controllers/deleteReportController.js";


const router = Router();

// Multer memory storage for Vercel compatibility
// const upload = multer({ storage: multer.memoryStorage() });
router.post("/upload", upload.single("report"), uploadReportController);
router.get("/:userId", getUserReportsController);
router.get("/single/:reportId", getSingleReportController);
router.delete("/delete/:reportId", deleteReportController);
router.post("/:reportId/analysis", saveReportAnalysisController);
router.get("/details/:reportId", getReportDetailsController);



export default router;