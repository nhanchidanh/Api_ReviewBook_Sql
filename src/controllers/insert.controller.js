const {
  internalServerError,
  badRequest,
} = require("../middlewares/handleErrors");
const { insertService } = require("../services/insert.service");

exports.insert = async (req, res) => {
  try {
    const response = await insertService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
