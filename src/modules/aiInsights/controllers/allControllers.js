// import { getInsightsService , getInsightsService } from "../services/allServices.js";
import { getInsightsService,generateAiInsight  } from "../services/allServices.js";
// import { generateInsightsService } from "../services/allServices.js";

const generateInsightsController = async (req, res)=>{
    
   const reportId = req.params.reportId;
   console.log("Received request to generate insights for report ID:", reportId);
    try{
        const generatedInsights = await generateAiInsight(reportId);
        res.status(200).json({
            success : true,
            message : "Insights Generated Successfully",
            data : generatedInsights
        })
    } catch(error) {
        if (error.status === 429) {
            return res.status(429).json({
                success: false,
                message: "AI quota exceeded. Please try again later.",
                retryAfter: error.retryAfter || 60,
                error: error.message
            });
        }
        res.status(500).json({
            success : false,
            message : "Insights Generation Failed",
            error : error.message
        })
    }

}

const getInsightsController = async (req,res)=>{
    const reportId = req.params.reportId;
    try{
        const insights = await getInsightsService(reportId);
        res.status(200).json({
            success : true,
            message : "Insights Retrieved Successfully",
            data : insights
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Insights Retrieval Failed",
            error : error.message
        })
    }
}

export {
    generateInsightsController,
    getInsightsController
}