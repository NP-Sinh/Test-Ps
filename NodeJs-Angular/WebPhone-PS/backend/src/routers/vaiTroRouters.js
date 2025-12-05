import express from "express";
import { vaiTroController } from "../controller/vaiTroController.js";

const router = express.Router();

router.get("/", vaiTroController.getVaiTro);
router.get("/getVaiTroById/:id", vaiTroController.getVaiTroById);
router.post("/modify", vaiTroController.modifyVaiTro);
router.delete("/delete/:id", vaiTroController.deleteVaiTro);
router.patch("/restore/:id", vaiTroController.restoreVaiTro);
router.get("/search", vaiTroController.searchVaiTro);

export default router;