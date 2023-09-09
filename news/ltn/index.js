const axios = require("axios");
const cheerio = require("cheerio");

const ltnScrap = async (item) => {
  try {
    if (item === "all") item = "";
    const page = await axios.get(
      `https://news.ltn.com.tw/list/breakingnews/${item}`
    );
    const $ = cheerio.load(page.data);
    let data = [];
    $(".list li").each((i, el) => {
      data.push({
        source: "ltn",
        title: $(el).find(".title").text(),
        date: $(el).find("span").text(),
        url: $(el).find("a").attr("href"),
        img: $(el).find("img").attr("data-src"),
      });
    });

    return data;
  } catch (e) {
    return e;
  }
};

module.exports = ltnScrap;
