const {
  getBooks,
  createBook,
  updateBook,
  deleteBooks,
} = require("../controllers/book.controller");
const { isAdmin, isAuthentication } = require("../middlewares/auth.middleware");
const uploadCloud = require("../middlewares/uploader");

const router = require("express").Router();

router.get("/", getBooks);
router.post(
  "/",
  uploadCloud.single("image"),
  [isAuthentication, isAdmin],
  createBook
);
router.put(
  "/",
  uploadCloud.single("image"),
  [isAuthentication, isAdmin],
  updateBook
);

router.delete("/", [isAuthentication, isAdmin], deleteBooks);

module.exports = router;
