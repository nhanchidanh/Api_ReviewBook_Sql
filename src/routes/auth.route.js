const {
  register,
  login,
  refreshTokenController,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshTokenController);

module.exports = router;
