const express = require("express");
const userSignup = require("./../controller/singupuser");

const signup = (req, res) => {
  console.log(Controller);
  res.status(201).json({ status: "success", data: "data got inserted" });
};
const router = express.Router();
//signup controller called
router.route("/signup").post(userSignup.insertUser);
router.route("/login").post(userSignup.login);
module.exports = router;
