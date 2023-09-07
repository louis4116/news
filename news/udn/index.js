const puppeteer = require("puppeteer-core");
const { executablePath } = require("puppeteer");
const chromium = require("@sparticuz/chromium");
const autoScroll = require("../../util/autoScroll");

const udnScrapy = async (item) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
    ignoreDefaultArgs: [
      ...chromium.args,
      "--enable-automation",
      "--disable-extensions",
    ],
    executablePath: await chromium.executablePath(),
    defaultViewport: chromium.defaultViewport,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto(`https://udn.com/news/breaknews/1/${item}#breaknews`, {
    waitUntil: "domcontentloaded",
  });
  let count = 0;
  let maxCount = 2;
  while (count <= maxCount) {
    //自動滾動 獲取更多新聞
    await autoScroll({ page, dis: 1200, max: 3 });
    count++;
  }

  const result = await page.evaluate(() => {
    //抓取dom 來獲取頁面上的新聞資料
    let data = [];
    let newsList = document.querySelectorAll(
      ".context-box__content.story-list__holder.story-list__holder--full .story-list__news"
    );
    for (let i = 0; i < newsList.length; i++) {
      data.push({
        source: "udn",
        title: newsList[i]
          .querySelector(".story-list__text h2")
          ?.textContent.trim(),
        date: newsList[i].querySelector(".story-list__time")?.textContent,
        url: newsList[i]
          .querySelector(".story-list__text h2 a")
          ?.getAttribute("href"),
        img: newsList[i]
          .querySelector(".story-list__image img")
          ?.getAttribute("data-src"),
        summary: newsList[i].querySelector(".story-list__text p a")
          ?.textContent,
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

module.exports = udnScrapy;
