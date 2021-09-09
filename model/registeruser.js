const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const registerSchema = new mongoose.Schema({
  mobileno: {
    type: Number,
    required: [true, `Mobile Number Can't Be Empty`],
    unique: true,
  },
  name: {
    type: String,
    required: [true, `Name Can't Be Empty`],
    trim: true,
    lowercase: true,
  },
  societyname: {
    type: String,
    required: [true, "Please Select the Society Name"],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, `Password Can't Be Empty`],
    select: false,
  },
  confirmpassword: {
    type: String,
    required: [true, `Confirm Password Can't Be Empty`],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not same",
    },
  },
});

registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //hash password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  //deleting confirmpassword field
  this.confirmpassword = undefined;
  next();
});
//instance method of the colletion
registerSchema.methods.correctPassword = async function (
  candidatepassword,
  userpassword
) {
  return await bcrypt.compare(candidatepassword, userpassword);
};

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
