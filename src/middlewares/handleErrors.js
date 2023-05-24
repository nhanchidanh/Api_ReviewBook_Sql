const createError = require("http-errors");

exports.badRequest = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.statusCode).json({
    err: 1,
    msg: error.message,
  });
};

exports.unauthorized = (err, res, isExpired) => {
  const error = createError.Unauthorized(err);
  return res.status(error.statusCode).json({
    err: isExpired ? 2 : 1,
    msg: error.message,
  });
};

exports.forbidden = (err, res) => {
  const error = createError.Forbidden(err);
  return res.status(error.statusCode).json({
    err: 1,
    msg: error.message,
  });
};

exports.internalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.statusCode).json({
    err: 1,
    msg: error.message,
  });
};

exports.notFound = (req, res) => {
  const error = createError.NotFound("This route is not defined");
  return res.status(error.statusCode).json({
    err: 1,
    msg: error.message,
  });
};
