import { uploadReportService, getUserReportsService, getSingleReportService, deleteReportService, saveReportAnalysisService } from "../services/allServices.js";


const uploadReportController =async(req,res)=>{
    try{
        const userId = req.body.userId; // Get userId from FormData body
        // const reportType = req.body.reportType; // Get reportType from FormData body
        const reportId = req.body.reportId; // Get reportId from FormData body
        const file = req.file;
        const {reportType, reportDate} = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
                reportId
            });
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const newReport = await uploadReportService(userId, file, reportType, reportDate);
        res.status(200).json({
            success : true,
            message : "Report Uploaded Successfully",
            newReport
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Report Upload Failed",
            error : error.message
        })
    }
}

const getUserReportsController = async (req, res)=>{
    const userId = req.params.userId; // Match the route parameter name
    try{
        const userReports = await getUserReportsService(userId);
        res.status(200).json({
            success : true,
            message : "User Reports Fetched Successfully",
            userReports
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Fetching User Reports Failed",
            error : error.message
        })
    }
}


const getSingleReportController = async (req,res)=>{
    const reportId = req.params.reportId;
    try{
        const report = await getSingleReportService(reportId);
        res.status(200).json({
            success : true,
            message : "Report Fetched Successfully",
            report
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Fetching Report Failed",
            error : error.message
        })
    }
}


const deleteReportController = async (req,res)=>{
    const reportId = req.params.reportId;
    try{
        const deletedReport = await deleteReportService(reportId);
        res.status(200).json({  
            success : true,
            message : "Report Deleted Successfully",
            deletedReport
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Report Deletion Failed", 
            error : error.message
        })
    }
}


const saveReportAnalysisController = async (req, res) => {
    try {
        const { reportId } = req.params;
        const {
            summaryEnglish,
            summaryRomanUrdu,
            abnormalValues,
            dietSuggestions,
            homeRemedies,
            doctorAdvice,
            analyzedAt
        } = req.body;

        const updatedReport = await saveReportAnalysisService(reportId, {
            summaryEnglish,
            summaryRomanUrdu,
            abnormalValues,
            dietSuggestions,
            homeRemedies,
            doctorAdvice,
            analyzedAt
        });

        if (!updatedReport) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Analysis saved successfully',
            report: updatedReport
        });

    } catch (error) {
        console.error('Save analysis error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save analysis',
            error: error.message
        });
    }
}

const getReportDetailsController = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await getSingleReportService(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Report fetched successfully',
            report: report
        });

    } catch (error) {
        console.error('Get report details error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch report details',
            error: error.message
        });
    }
}

export {
    uploadReportController,
    getUserReportsController,
    getSingleReportController,
    deleteReportController,
    saveReportAnalysisController,
    getReportDetailsController
}




