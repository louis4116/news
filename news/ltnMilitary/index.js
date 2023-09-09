const axios = require("axios");
const cheerio = require("cheerio");

const ltnMilitary = async (item) => {
  try {
    const response = await axios.get(`https://def.ltn.com.tw/${item}`);
    const $ = cheerio.load(response.data);
    let data = [];
    $(".article-box").each((i, el) => {
      data.push({
        source: "military",
        title: $(el).find("h3").text().trim(),
        date: $(el).find("span").text().trim(),
        url: $(el).attr("href"),
        img: $(el).find("div img").attr("data-src"),
      });
    });
    return data;
  } catch (e) {
    return e;
  }
};

module.exports = ltnMilitary;
