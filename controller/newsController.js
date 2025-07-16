const mongoose = require("mongoose");
const News = require("../model/newModel");
const User = require("../model/userModel");

exports.getUserNews = async (req, res) => {
  try {
    const news = await News.find({ user: req.params.id });
    res.status(200).json({
      news,
    });
  } catch (e) {
    res.status(500).json({
      msg: e,
    });
  }
};

exports.storeNewsToUser = async (req, res) => {
  const newsId = new mongoose.Types.ObjectId();
  const findNews = await News.find({ title: req.body.title });
  const findUser = await User.findOne({ _id: req.params.id });
  if (findUser && findNews.length !== 0)
    return res.status(403).send("此新聞已經存在");
  try {
    await News.create({
      id: newsId,
      user: req.body.user,
      source: req.body.source,
      date: req.body?.date,
      title: req.body.title,
      url: req.body.url,
      img: req.body?.img,
      summary: req.body?.summary,
    });
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { news: newsId } },
      { new: true } //更新後的值
    );
    await user.save();
    res.status(200).json({
      status: "success",
      msg: "添加成功",
      user,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      msg: e,
    });
  }
};

exports.deleteNewsFromUser = async (req, res) => {
  const findNews = await News.findOne({ _id: req.params.id });
  if (!findNews) return res.status(404).send("錯誤，無欲刪除項目");
  try {
    const deleteResult = await News.findOneAndDelete({ _id: req.params.id });
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { news: req.body.news } },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      msg: "刪除成功",
      result,
      deleteResult,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      msg: e,
    });
  }
};

exports.createMemo = async (req, res) => {
  const findNews = await News.findOne({ _id: req.params.id });
  if (!findNews) return res.status(404).send("錯誤，無項目");
  // console.log(req.body.memo);
  try {
    const result = await News.findOneAndUpdate(
      { _id: req.params.id },
      { memo: req.body.memo },
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
