import Router from 'express';
import { craeteUserController,updateUserController,deleteUserController,getCurrentUserController } from './controllers/allControllers.js';
import loginUser from './controllers/authController.js';
import upload from '../uploads/middleware/multer.js';
const router = Router();

router.post("/", upload.single("profilePicture"), craeteUserController);
router.put("/:id", upload.single("profilePicture"), updateUserController);
router.delete("/:id", deleteUserController);
router.get("/:id", getCurrentUserController);

router.post("/login", loginUser);




export default router;