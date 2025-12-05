import pictureModel from "../models/pictureModel.js";
import fs from "fs";
import path from "path"; 

export const pictureServices = {

    getPictures: async () => {
        try {
            const data = await pictureModel.find().sort({ createdAt: -1 });
            return data;
        } catch (error) {
            console.error("Lỗi getPictures", err);
        }
    },

    getPictureById: async (id) => {
        try {
            return await pictureModel.findById(id);
        } catch (error) {
            console.error("Lỗi getPictureById:", error);
            throw error;
        }
    },

    createPicture: async (payload) => {
        try {
            const newPicture = await pictureModel.create(payload);
            return newPicture;
        } catch (error) {
            console.error("Lỗi createPicture:", error);
            throw error;
        }
    },

    updatePicture: async (id, payload) => {
        try {
            const updated = await pictureModel.findByIdAndUpdate(id, payload, { new: true });
            return updated;
        } catch (error) {
            console.error("Lỗi updatePicture:", error);
            throw error;
        }
    },

    deletePicture: async (id) => {
        try {
            const picture = await pictureModel.findById(id);
            
            if (!picture) {
                throw new Error("Không tìm thấy hình ảnh để xóa");
            }

            const removeFileFromDisk = (fileUrl) => {
                if (!fileUrl) return;     
                try {
                    const fileName = fileUrl.split("/assets/")[1]; 
                    if (fileName) {
                        const filePath = path.join("assets", fileName);
       
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath); 
                        }
                    }
                } catch (err) {
                    console.error(`Lỗi khi xóa file ${fileUrl}:`, err);
                }
            };
            removeFileFromDisk(picture.mainImage);

            if (picture.subImages && picture.subImages.length > 0) {
                picture.subImages.forEach(imgUrl => {
                    removeFileFromDisk(imgUrl);
                });
            }
            await pictureModel.findByIdAndDelete(id);

            return { message: "Xóa dữ liệu và file ảnh thành công" };
        } catch (error) {
            console.error("Lỗi deletePicture:", error);
            throw error;
        }
    }
}