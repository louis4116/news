const puppeteer = require("puppeteer");
const autoScroll = require("../../util/autoScroll");

const ltnScrap = async (item) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-infobars",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  const page = await browser.newPage();
  await page.goto(`https://news.ltn.com.tw/list/breakingnews/${item}`, {
    waitUntil: "domcontentloaded",
  });

  await autoScroll({ page, dis: 3000, max: 3 });

  const result = await page.evaluate(() => {
    let data = [];
    let newsTilteTit = document.querySelectorAll(".tit");
    let newsImg = document.querySelectorAll(".lazy_imgs_ltn");
    for (let i = 0; i < newsTilteTit.length; i++) {
      let href = newsTilteTit[i].getAttribute("href");
      let img = newsImg[i].getAttribute("data-src");
      data.push({
        source: "ltn",
        date: newsTilteTit[i].querySelector("span").textContent,
        title: newsTilteTit[i].querySelector("div").querySelector("h3")
          .textContent,
        url: href,
        img: img,
      });
    }
    return data;
  });
  await page.waitForFunction(
    (result) => {
      return result && result.length >= 20;
    },
    {},
    result
  );
  await browser.close();
  return result;
};

module.exports = ltnScrap;
