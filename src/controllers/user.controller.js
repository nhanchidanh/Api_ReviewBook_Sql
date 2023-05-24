const {
  internalServerError,
  badRequest,
} = require("../middlewares/handleErrors");
const { getOneService } = require("../services/user.service");

exports.getCurrent = async (req, res) => {
  try {
    if (!req.user) return badRequest("User khong ton tai!", res);
    const { id } = req.user;

    const response = await getOneService(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
