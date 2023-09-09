const cheerio = require("cheerio");
const axios = require("axios");

const udnScrapy = async (item) => {
  try {
    const page = await axios.get(
      `https://udn.com/news/breaknews/1/${item}#breaknews`
    );
    const $ = cheerio.load(page.data);
    let data = [];
    $(
      ".context-box__content.story-list__holder.story-list__holder--full .story-list__news"
    ).each((i, el) => {
      data.push({
        source: "udn",
        title: $(el).find(".story-list__text h2").text().trim(),
        date: $(el).find(".story-list__time").text(),
        url: $(el).find(".story-list__text h2 a").attr("href"),
        img: $(el).find(".story-list__image img").attr("data-src"),
        summary: $(el).find(".story-list__text p a").text(),
      });
    });
    return data;
  } catch (e) {
    return e;
  }
};

module.exports = udnScrapy;
