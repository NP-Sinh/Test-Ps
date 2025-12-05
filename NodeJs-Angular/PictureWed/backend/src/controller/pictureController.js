import { pictureServices } from "../services/pictureServices.js";

export const pictureController = {
    getPictures: async (req, res) => {
        try {
            const data = await pictureServices.getPictures();
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getPictureById: async (req, res) => {
        try {
            const data = await pictureServices.getPictureById(req.params.id);
            if (!data) return res.status(404).json({ message: "Không tìm thấy" });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createPicture: async (req, res) => {
        try {
            const { name, category } = req.body;
            if (!req.files || !req.files.mainImage) {
                return res.status(400).json({ message: "Vui lòng upload ảnh chính (mainImage)" });
            }
            const mainImageUrl = `/assets/${req.files.mainImage[0].filename}`;

            let subImagesUrls = [];
            if (req.files.subImages) {
                subImagesUrls = req.files.subImages.map(file => `/assets/${file.filename}`);
            }

            const payload = {
                name,
                category,
                mainImage: mainImageUrl,
                subImages: subImagesUrls
            };

            const data = await pictureServices.createPicture(payload);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
 
    updatePicture: async (req, res) => {
        try {
            const { name, category } = req.body;
            let payload = { name, category };

            if (req.files) {
                if (req.files.mainImage) {
                    payload.mainImage = `/assets/${req.files.mainImage[0].filename}`;
                }
                if (req.files.subImages) {
                    payload.subImages = req.files.subImages.map(file => `/assets/${file.filename}`);
                }
            }

            const data = await pictureServices.updatePicture(req.params.id, payload);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deletePicture: async (req, res) => {
        try {
            const result = await pictureServices.deletePicture(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}