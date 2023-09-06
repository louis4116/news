const cna = require("../news/cna/index");
const cnaCategory = require("./newsCategory/cna-category");
const ltn = require("../news/ltn/index");
const ltnCategory = require("./newsCategory/ltn-category");
const ltnMilitary = require("../news/ltnMilitary/index");
const ltnMilitaryCategory = require("./newsCategory/ltn-military-category");
const udn = require("../news/udn/index");
const udnCategory = require("./newsCategory/udn-category");

const handleScrapNews = async (req, res, category, news) => {
  const findResult = category.find((item) => item === req.params.id);
  if (!findResult)
    return res.status(400).json({ status: "fail", msg: "無此標籤" });
  try {
    const data = await news(findResult);
    res.json({
      status: "success",
      length: data.length,
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: "出錯！！！",
    });
  }
};

exports.getCna = async (req, res) => {
  handleScrapNews(req, res, cnaCategory, cna);
};
exports.getLtn = async (req, res) => {
  handleScrapNews(req, res, ltnCategory, ltn);
};
exports.getltnMilitary = async (req, res) => {
  handleScrapNews(req, res, ltnMilitaryCategory, ltnMilitary);
};
exports.getUdn = async (req, res) => {
  handleScrapNews(req, res, udnCategory, udn);
};
