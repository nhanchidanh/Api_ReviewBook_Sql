const Joi = require("joi");
const {
  internalServerError,
  badRequest,
} = require("../middlewares/handleErrors");
const authService = require("../services/auth.service");
const { email, password, refreshToken } = require("../helpers/joi_schema");

const register = async (req, res) => {
  try {
    const { error } = Joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error?.details[0]?.message, res);
    const response = await authService.registerService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

const login = async (req, res) => {
  try {
    const { error } = Joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error?.details[0]?.message, res);
    const response = await authService.loginService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

const refreshTokenController = async (req, res) => {
  try {
    //Validate input
    // console.log(req.body);
    const { error } = Joi.object({ refreshToken }).validate(req.body);
    if (error) return badRequest(error?.message, res);

    //return new refresh token
    const response = await authService.refreshTokenService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

module.exports = {
  register,
  login,
  refreshTokenController,
};
