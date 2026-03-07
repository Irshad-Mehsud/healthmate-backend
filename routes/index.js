import Router from 'express';
import userRoutes from "../src/modules/user/routes.js";
import reportRoutes from "../src/modules/reports/routes.js";
import aiInsightRoutes from "../src/modules/aiInsights/routes.js";


const router = Router();


router.use("/users", userRoutes);
router.use("/reports", reportRoutes);
router.use("/ai-insights", aiInsightRoutes);






export default router;