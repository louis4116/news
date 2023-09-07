const puppeteer = require("puppeteer-core");
const { executablePath } = require("puppeteer");
const chromium = require("@sparticuz/chromium");

const cnaScrap = async (id) => {
  try {
    const browser = await puppeteer.launch({
      headless: "news",
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
    await page.goto(`https://www.cna.com.tw/list/${id}.aspx`, {
      waitUntil: "domcontentloaded",
    });

    let count = 0;
    let maxCount = 2;
    if (id !== "aall") {
      //點擊畫面中的按鈕，讓新聞可以繼續跑
      while (count <= maxCount) {
        await page.waitForTimeout(200);
        await page.click("#SiteContent_uiViewMoreBtn_Style3");
        count++;
      }
    }

    const result = await page.evaluate(() => {
      let data = [];

      let newsItem = document.querySelectorAll(".mainList li");
      newsItem.forEach((el, i) => {
        let imgElement = newsItem[i]
          ?.querySelector(".wrap img")
          ?.getAttribute("src");
        if (imgElement) {
          data.push({
            source: "cna",
            title: newsItem[i].querySelector(".listInfo h2 span").textContent,
            date: newsItem[i].querySelector(".listInfo div").textContent,
            url: newsItem[i].querySelector("a").getAttribute("href"),
            img:
              newsItem[i]?.querySelector(".wrap img")?.getAttribute("src") ||
              "",
          });
        } else {
          data.push({
            category: "cna",
            title: newsItem[i].querySelector(".listInfo h2 span").textContent,
            date: newsItem[i].querySelector(".listInfo div").textContent,
            url: newsItem[i].querySelector("a").getAttribute("href"),
          });
        }
      });

      return data;
    });
    await page.waitForFunction(
      async (result) => {
        return result && result.length >= 20;
      },
      {},
      result
    );
    await browser.close();
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = cnaScrap;
