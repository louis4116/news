const axios = require("axios");
const cheerio = require("cheerio");

const cnaScrap = async (id) => {
  try {
    const page = await axios.get(`https://www.cna.com.tw/list/${id}.aspx`);
    const $ = cheerio.load(page.data);
    let data = [];
    $(".mainList li").each((el, i) => {
      data.push({
        source: "cna",
        title: $(i).find(".listInfo h2 span").text(),
        date: $(i).find(".date").text(),
        url: $(i).find("a").attr("href"),
        img: $(i).find(".wrap img").attr("data-src") || "",
      });
    });
    return data;
  } catch (e) {
    return e;
  }
};

module.exports = cnaScrap;
