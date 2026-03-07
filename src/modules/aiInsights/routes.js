import express from "express";
import { generateInsightsController } from "../aiInsights/controllers/allControllers.js";
import authentication from "../../../helpers/index.js";

const router = express.Router();

router.post("/:reportId", generateInsightsController);

export default router;