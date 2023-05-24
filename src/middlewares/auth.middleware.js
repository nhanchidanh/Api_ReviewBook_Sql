const jwt = require("jsonwebtoken");
const { unauthorized, forbidden } = require("./handleErrors");

exports.isAuthentication = (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) return unauthorized("Vui long dang nhap!", res);

  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      const isChecked = error instanceof jwt.TokenExpiredError;
      if (!isChecked)
        return unauthorized("Access token khong hop le!", res, isChecked);
      if (isChecked)
        return unauthorized("Access token het han", res, isChecked);
    }
    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const { roleId } = req.user;
  // console.log(roleId);
  if (+roleId !== 1) return forbidden("Yeu cau quyen admin", res);
  next();
};
