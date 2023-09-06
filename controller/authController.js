const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const sendEmail = require("../util/sendEmail");

exports.resolveToken = async (req, res, next) => {
  //確認是否登入
  console.log("中間");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ status: "fail", message: "請先登入" });
  }
  const result = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(result.id);
  if (!currentUser)
    return res.status(401).json({ status: "fail", msg: "無此使用者" });
  req.user = currentUser;
  next();
};

exports.signUp = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("此信箱已被註冊");
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  try {
    res.status(200).send({
      msg: "success",
      newUser,
    });
  } catch (err) {
    res.status(400).send("註冊失敗");
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ status: "fail", msg: "請輸入信箱與密碼" });
  try {
    const user = await User.findOne({ email }).select("+password");
    if (
      !user ||
      !(await user.correctPassword({
        inputPassword: password,
        userPassword: user.password,
      }))
    ) {
      return res.status(401).json({ status: "error", msg: "帳號或密碼錯誤" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      status: "success",
      token,
      id: user.id,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "伺服器錯誤" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).json({ status: "success" });
  } catch (e) {
    res.status(400).json({ status: "error", message: "錯誤" });
  }
};

exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("使用者不存在");
  const host = req.get("host");
  const protocol = req.protocol;
  try {
    const result = await sendEmail({
      email: user.email,
      protocol,
      host,
    });
    user.resetPasswordToken = result;
    user.resetPasswordExpires = Date.now() + 600000;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "信件已寄出",
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.id,
    resetPasswordExpires: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) return res.status(400).send("令牌過期或是錯誤！！！");
  try {
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "成功",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "請確認密碼是否輸入正確",
    });
  }
};

exports.loginUserResetPassword = async (req, res, next) => {
  try {
    const loginUser = await User.findById({ _id: req.params.id }).select(
      "+password"
    );
    if (!loginUser) return res.status(400).send("請先登入！！！");
    const { oldPassword } = req.body;
    if (
      !(await loginUser.correctPassword({
        inputPassword: oldPassword,
        userPassword: loginUser.password,
      }))
    ) {
      return res.status(401).send("密碼錯誤");
    }
    loginUser.password = req.body.newPassword;

    await loginUser.save();
    res.status(200).json({
      status: "success",
      message: "成功",
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "請確認密碼是否輸入正確",
    });
  }
};
exports.upadatedProfileImg = async (req, res, next) => {
  try {
    const loginUser = await User.findById({ _id: req.params.id });
    if (!loginUser) return res.status(400).send("請先登入！！！");
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      { avatar: req.body.avatar },
      { new: true }
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      status: "fail",
      msg: e,
    });
  }
};
