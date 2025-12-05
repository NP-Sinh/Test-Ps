import express from "express";
import { pictureController } from "../controller/pictureController.js";
import { upload } from "../middleware/uploadMiddleware.js"; 

const router = express.Router();

router.get("/", pictureController.getPictures);
router.get("/:id", pictureController.getPictureById);

const uploadFields = upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'subImages', maxCount: 5 }
]);

router.post("/", uploadFields, pictureController.createPicture);
router.put("/:id", uploadFields, pictureController.updatePicture);
router.delete("/:id", pictureController.deletePicture);

export default router;