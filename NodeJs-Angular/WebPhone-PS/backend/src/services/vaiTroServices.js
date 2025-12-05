import { context } from "../config/dbconfig.js";

export const vaiTroServices = {
  getVaiTro: async (trangthai = null) => {
    try {
      let query = "select * from VaiTro";
      let params = [];
      if (trangthai !== null) {
        query += " where trangthai = $1";
        params.push(trangthai);
      }
      query += " order by id";
      const result = await context.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Lỗi getVaiTro:", error);
    }
  },
  getVaiTroById: async (id) => {
    try {
      const query = ` select * from VaiTro where id = $1 order by id `;
      const result = await context.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Lỗi getVaiTroById:", error);
    }
  },

  modifyVaiTro: async (id, tenvaitro) => {
    try {
      if (id == 0) {
        const query = `insert into VaiTro (tenvaitro, trangthai)  values ($1, true) returning *`
        const result = await context.query(query, [tenvaitro]);
        return result.rows[0];
      }
      else {
        const query = `update VaiTro set tenvaitro = $1 where id = $2 returning *`;
        const result = await context.query(query, [tenvaitro, id]);
        return result.rows[0];
      }
    } catch (error) {
      console.error("Lỗi modify vai trò:", error);
    }
  },

  deleteVaiTro: async (id) => {
    try {
      const query = ` update VaiTro set trangthai = false where id = $1 returning *`;
      const result = await context.query(query, [id]);
      return {
        message: 'Đã vô hiệu hóa vai trò thành công',
      };
    } catch (error) {
      console.error("Lỗi deleteVaiTro:", error);
    }
  },

  restoreVaiTro: async (id) => {
    try {
      const query = ` update VaiTro set trangthai = true where id = $1 returning * `;
      const result = await context.query(query, [id]);

      return {
        message: 'Đã khôi phục vai trò thành công',
      };
    } catch (error) {
      console.error("Lỗi restoreVaiTro:", error);
    }
  },

  // search vai trò
  searchVaiTro: async (key) => {
    try {
      const {
        searchText = null,
        trangThai = null,
        pageNumber = 1,
        pageSize = 10
      } = key;

      const query = `select * from search_vai_tro($1, $2, $3, $4)`;

      const result = await context.query(query, [
        searchText,
        trangThai,
        pageNumber,
        pageSize
      ]);
      return result.rows;
    } catch (error) {
      console.error("Lỗi searchVaiTro:", error);
    }
  }
};
