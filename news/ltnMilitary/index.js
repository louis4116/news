const puppeteer = require("puppeteer");
const autoScroll = require("../../util/autoScroll.js");

const ltnMilitary = async (item) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-gpu",
      "--disable-infobars",
      "--disable-extensions",
      "--disable-bundled-ppapi-flash",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (request.resourceType() === "image") request.abort();
    else request.continue();
  });
  await page.goto(`https://def.ltn.com.tw/${item}`, {
    waitUntil: "domcontentloaded",
  });

  await autoScroll({ page, dis: 3000, max: 4 });

  const result = await page.evaluate(() => {
    let data = [];
    let newsItem = document.querySelectorAll(".article-box");
    newsItem.forEach((el, i) => {
      data.push({
        source: "military",
        title: newsItem[i].querySelector("h3").textContent.trim(),
        date: newsItem[i].querySelector("span").textContent.trim(),
        url: newsItem[i].getAttribute("href"),
        img: newsItem[i].querySelector("div img").getAttribute("data-src"),
      });
    });
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

module.exports = ltnMilitary;
