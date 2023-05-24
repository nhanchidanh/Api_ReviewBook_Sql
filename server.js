const express = require("express");
const cors = require("cors");
require("dotenv").config();

const initRouter = require("./src/routes");
require("./connect_db");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app);
const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
