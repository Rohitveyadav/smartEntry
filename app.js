const express = require("express");
const app = express();
const userRoute = require("./router/singuproute");

//middleware for the accpeting body parameter
app.use(express.json());

app.use(express.static(`${__dirname}/view`));
app.use("/api/v1/smartentry", userRoute);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.statusCode = 404;
  err.status = "fail";
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({ status: err.status, message: err.message });
});
module.exports = app;
