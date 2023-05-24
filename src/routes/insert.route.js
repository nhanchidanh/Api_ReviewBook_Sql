const { insert } = require("../controllers/insert.controller");
const { getCurrent } = require("../controllers/user.controller");
const { isAuthentication, isAdmin } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", insert);

module.exports = router;
