const db = require("../models");

exports.getOneService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: id,
        attributes: {
          exclude: [
            "password",
            "roleId",
            "createdAt",
            "updatedAt",
            "refreshToken",
          ],
        },
        include: [
          { model: db.Role, as: "roleData", attributes: ["id", "name"] },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Lay thong tin nguoi dung thanh cong"
          : "Nguoi dung khong ton tai",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};
