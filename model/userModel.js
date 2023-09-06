const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: [true, "缺少名字"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      require: [true, "缺少信箱"],
      validate: [validator.isEmail, "缺少信箱"],
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
      required: [true, "缺少密碼"],
    },
    passwordConfirm: {
      type: String,
      require: [true, "請再輸入一次密碼"],
      validate: {
        validator: function (item) {
          return item === this.password;
        },
        message: "密碼不同，請再輸入一次",
      },
    },
    avatar: { type: String, default: "" },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    news: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "New",
      },
    ],
  },
  { versionKey: false }
);

//儲存前如果密碼有更動就進行hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//比對密碼
userSchema.methods.correctPassword = async function ({
  inputPassword,
  userPassword,
}) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
