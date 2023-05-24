const jwt = require("jsonwebtoken");
const db = require("../models");
const bcrypt = require("bcryptjs");
const { unauthorized } = require("../middlewares/handleErrors");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const registerService = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
          roleId: 2,
        },
      });

      const accessToken = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              roleId: response[0].roleId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30s" }
          )
        : null;

      const refreshToken = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
            },
            process.env.JWT_SECRET_REFRESH_TOKEN,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        msg: response[1] ? "Dang ky thanh cong" : "Email da ton tai",
        accessToken: accessToken ? `Bearer ${accessToken}` : accessToken,
        refreshToken,
      });

      if (refreshToken) {
        await db.User.update(
          { refreshToken },
          { where: { id: response[0].id } }
        );
      }
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  });
};

const loginService = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });

      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);

      const accessToken = isCorrectPassword
        ? jwt.sign(
            { id: response.id, email: response.email, roleId: response.roleId },
            process.env.JWT_SECRET,
            { expiresIn: "60s" }
          )
        : null;

      const refreshToken = isCorrectPassword
        ? jwt.sign(
            {
              id: response.id,
            },
            process.env.JWT_SECRET_REFRESH_TOKEN,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: accessToken ? 0 : 1,
        msg: accessToken
          ? "Dang nhap thanh cong"
          : response
          ? "Mat khau sai"
          : "Tai khoan khong ton tai",
        accessToken: accessToken ? `Bearer ${accessToken}` : accessToken,
        refreshToken,
      });

      if (refreshToken) {
        await db.User.update({ refreshToken }, { where: { id: response.id } });
      }
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  });
};

const refreshTokenService = ({ refreshToken }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({ where: { refreshToken } });

      if (response) {
        jwt.verify(
          refreshToken,
          process.env.JWT_SECRET_REFRESH_TOKEN,
          (error) => {
            if (error) {
              resolve({
                err: 1,
                msg: "Refresh token het han",
              });
            } else {
              const accessToken = jwt.sign(
                {
                  id: response.id,
                  email: response.email,
                  roleId: response.roleId,
                },
                process.env.JWT_SECRET,
                { expiresIn: "60s" }
              );

              resolve({
                err: accessToken ? 0 : 1,
                msg: accessToken
                  ? "OK"
                  : "Fail to generate new access token. Let try more time",
                accessToken: accessToken
                  ? `Bearer ${accessToken}`
                  : accessToken,
                refreshToken,
              });
            }
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { registerService, loginService, refreshTokenService };
