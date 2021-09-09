const jwt = require("jsonwebtoken");
const Register = require("./../model/registeruser");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETSTRING, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.insertUser = async (req, res) => {
  try {
    const regUser = await Register.create({
      mobileno: req.body.mobileno,
      name: req.body.name,
      societyname: req.body.societyname,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    });

    const token = signToken(regUser._id);

    res.status(201).json({ status: "success", token, data: { user: regUser } });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "fail", message: err });
  }
};

exports.login = async (req, res, next) => {
  const { mobileno, password } = req.body;

  if (!mobileno || !password) {
    const err = new Error(`Please provide email and password`);
    err.statusCode = 400;
    err.status = "fail";
  }

  const user = await Register.findOne({ mobileno }).select("+password");

  console.log(user);

  // const correct = await user.correctPassword(password, user.password);

  if (!user && !correct) {
    const err = new Error(`Incorrect email or password`);
    err.statusCode = 401;
    err.status = "fail";
    next();
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
};
