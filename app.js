const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const analyticsRouter = require("./routes/analytics");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const positionRouter = require("./routes/position");
const config = require("./сonfig/keys");

const app = express();

mongoose
  .connect(config.mongoURL)
  .then(() => console.log("MongoDB connected."))
  .catch((error) => console.log(error));

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(morgan("dev"));
// для статический фотографий
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRouter);
app.use("/api/category", categoryRouter);
app.use("/api/order", orderRouter);
app.use("/api/position", positionRouter);

module.exports = app;
