import { craeteUserService, deleteUserService, getCurrentUserService, updatedUserService } from "../services/allServices.js";
import uploadFileToCloudinary from "../../uploads/middleware/cloudinary.js";


const craeteUserController = async (req,res)=>{
    try{
   let profilePicture = "";

   if (req.file) {
     const uploaded = await uploadFileToCloudinary(req.file.buffer, req.file.mimetype);
     profilePicture = uploaded.fileUrl;
   }

   const user = await craeteUserService({ ...req.body, profilePicture });
   res.status(201).json({
    success : true,
    message : "User Craeted Successfully",
    user
   })   
    }catch(error){
      res.status(500).json({
        success : false,
        message : "User Craetion Failed",
        error : error.message
      })
    };
}

const updateUserController = async (req,res)=>{
    const {id} = req.params;
    try{
        let updateData = { ...req.body };

        if (req.file) {
          const uploaded = await uploadFileToCloudinary(req.file.buffer, req.file.mimetype);
          updateData.profilePicture = uploaded.fileUrl;
        }

        const updatedUser = await updatedUserService(id, updateData);
        res.status(200).json({
            success : true,
            message : "User Updated Successfully",
            updatedUser
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "User Update Failed",
            error : error.message
        })
    }
}

const deleteUserController = (req,res)=>{
    const id = req.params.id;
    try{
        const deletedUser = deleteUserService(id);
        res.status(200).json({
            sucess : true,
            message : "User Deleted Successfully",
            deletedUser
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "User Deletion Failed",
            error : error.message
        })
    }
}

const getCurrentUserController = (req,res)=>{
    const userId = req.params.id;
    try{
        const currentUser = getCurrentUserService(userId);
        res.status(200).json({
            success : true,
            message : "Current User Fetched Successfully",
            currentUser
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Fetching Current User Failed",
            error : error.message
        })

    }
}

export {
    craeteUserController,
    updateUserController,
    deleteUserController,
    getCurrentUserController

}