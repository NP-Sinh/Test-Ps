import { vaiTroServices } from "../services/vaiTroServices.js";

export const vaiTroController = {
    getVaiTro: async (req, res) => {
        try {
            const data = await vaiTroServices.getVaiTro();
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getVaiTroById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await vaiTroServices.getVaiTroById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    modifyVaiTro: async (req, res) => {
        try {
            const { id, tenvaitro } = req.body;
            const vaiTro = await vaiTroServices.modifyVaiTro(id, tenvaitro);
            res.status(200).json(vaiTro);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteVaiTro: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await vaiTroServices.deleteVaiTro(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    restoreVaiTro: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await vaiTroServices.restoreVaiTro(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    searchVaiTro: async (req, res) => {
        try {
            const {
                searchText,
                trangThai,
                pageNumber = 1,
                pageSize = 10
            } = req.query;

            const key = {
                searchText: searchText || null,
                trangThai: trangThai !== undefined ? trangThai === 'true' : null,
                pageNumber: parseInt(pageNumber),
                pageSize: parseInt(pageSize)
            };

            const data = await vaiTroServices.searchVaiTro(key);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

}