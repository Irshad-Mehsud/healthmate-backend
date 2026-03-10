import Report from "../schema/reportSchema.js";
import uploadFileToCloudinary from "../../uploads/middleware/cloudinary.js";

const uploadReportService = async (userId, file, reportType, reportDate)=>{
    try{

        const {fileUrl, publicId} = await uploadFileToCloudinary(file.buffer, file.mimetype);

        const newReport = await Report.create({
            user : userId,
            fileUrl,
            publicId,
            fileType : file.mimetype?.startsWith("image/") ? "image" : "pdf",
            reportType,
            reportDate
        });

        return newReport;

    }catch(error){
        throw new Error("Report Upload Failed: " + error.message);
    }
}

const getUserReportsService = async (userId)=>{
    try{
        const userReports = await Report.find({ user: userId }).sort({ reportDate: -1 });
        return userReports;
    }catch(error){
        throw new Error("Fetching User Reports Failed: " + error.message);
    }
}

const getSingleReportService = async (reportId)=>{
    try{
        const report = await Report.findById(reportId);
        return report;
    }catch(error){
        throw new Error("Fetching Report Failed: " + error.message);
    }
}

const deleteReportService = async (reportId)=>{
    try{
        const deletedReport = await Report.findByIdAndDelete(reportId);
        return deletedReport;
    }catch(error){
        throw new Error("Deleting Report Failed: " + error.message);
    }
}

const saveReportAnalysisService = async (reportId, analysisData) => {
    try {
        const {
            summaryEnglish,
            summaryRomanUrdu,
            abnormalValues,
            dietSuggestions,
            homeRemedies,
            doctorAdvice,
            analyzedAt
        } = analysisData;

        const updatedReport = await Report.findByIdAndUpdate(
            reportId,
            {
                analysis: {
                    summaryEnglish,
                    summaryRomanUrdu,
                    abnormalValues,
                    dietSuggestions,
                    homeRemedies,
                    doctorAdvice,
                    analyzedAt
                },
                status: 'Analyzed'
            },
            { new: true }
        );

        return updatedReport;
    } catch (error) {
        throw new Error("Saving Report Analysis Failed: " + error.message);
    }
}

export {
    uploadReportService,
    getUserReportsService,
    getSingleReportService,
    deleteReportService,
    saveReportAnalysisService
}