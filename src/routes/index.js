const { notFound } = require("../middlewares/handleErrors");
const authRoute = require("./auth.route");
const bookRoute = require("./book.route");
const userRoute = require("./user.route");
const insertRoute = require("./insert.route");

const initRouter = (app) => {
  app.use("/api/insert", insertRoute);
  app.use("/api/user", userRoute);
  app.use("/api/book", bookRoute);
  app.use("/api/auth", authRoute);

  return app.use(notFound);
};

module.exports = initRouter;
