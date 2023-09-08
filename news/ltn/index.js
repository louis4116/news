let chrome = {};
let puppeteer;

if ((process.env.NODE_ENV = "production")) {
  chrome = require("@sparticuz/chromium");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

const ltnScrap = async (item) => {
  let options = {};
  if ((process.env.NODE_ENV = "production")) {
    options = {
      headless: "new",
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      executablePath: await chrome.executablePath(),
    };
  } else {
    options = {
      headless: "new",
    };
  }

  let browser = await puppeteer.launch(options);
  let page = await browser.newPage();
  // await page.setRequestInterception(true);
  // page.on("request", (request) => {
  //   if (
  //     request.resourceType() === "image" ||
  //     request.resourceType() === "stylesheet" ||
  //     request.resourceType() === "font"
  //   )
  //     request.abort();
  //   else request.continue();
  // });
  await page.goto(`https://news.ltn.com.tw/list/breakingnews/${item}`);

  // await autoScroll({ page, dis: 3000, max: 3 });

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
  // await page.waitForFunction(
  //   async (result) => {
  //     return result && result.length >= 20;
  //   },
  //   {},
  //   result
  // );
  await browser.close();
  return result;
};

module.exports = ltnScrap;
