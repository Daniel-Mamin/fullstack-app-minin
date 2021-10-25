const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const analyticsRouter = require("./routes/analytics");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const positionRouter = require("./routes/position");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRouter);
app.use("/api/category", categoryRouter);
app.use("/api/order", orderRouter);
app.use("/api/position", positionRouter);

module.exports = app;
