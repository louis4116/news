const User = require("../model/userModel");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "news",
      select: "-__v",
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      msg: e,
    });
  }
};
