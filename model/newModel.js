const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    source: {
      type: String,
    },
    date: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "缺少標題"],
    },
    url: {
      type: String,
      required: [true, "缺少網址"],
    },
    img: {
      type: String,
    },
    summary: {
      type: String,
    },
    memo: {
      type: String,
    },
    storedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const News = mongoose.model("New", newsSchema);
module.exports = News;
