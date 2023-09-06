const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const scrapRoute = require("./routes/scraspNews/scrapNewsRoute");
const userRoute = require("./routes/user/userRoute");
const userNewsRoute = require("./routes/userNews/userNewsRoute");
const getUser = require("./routes/user/userRoute");

app.use(helmet());

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo連接成功");
  })
  .catch(() => {
    console.log("monogo連接失敗");
  });

app.use(express.json({ limit: 2621440 }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/news", scrapRoute);
app.use("/user", userRoute);
app.use("/handleNews", userNewsRoute);
app.use("/getUser", getUser);

app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    msg: "連接成功",
  });
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    msg: "找不到路由，請確認是否輸入錯誤",
  });
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`伺服器啟動${port}`);
});
