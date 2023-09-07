// const puppeteer = require("puppeteer");

// const tvbsScrap = async (item) => {
//   const browser = await puppeteer.launch({
//     headless: "new",
//     args: [
//       "--disable-infobars",
//       "--disable-gpu",
//       "--disable-dev-shm-usage",
//       "--disable-setuid-sandbox",
//       "--no-first-run",
//       "--no-sandbox",
//       "--no-zygote",
//     ],
//     ignoreDefaultArgs: ["--enable-automation"],
//     executablePath:
//       process.env.NODE_ENV === "production"
//         ? process.env.PUPPETEER_EXECUTABLE_PATH
//         : puppeteer.executablePath(),
//   });

//   const page = await browser.newPage();
//   await page.goto(`https://news.tvbs.com.tw/realtime/${item}`, {
//     waitUntil: "domcontentloaded",
//   });
//   await page.setRequestInterception(true);
//   page.on("request", (request) => {
//     if (request.resourceType() === "image") request.abort();
//     else request.continue();
//   });

//   const result = await page.evaluate(() => {
//     let data = [];
//     let allNews = document.querySelectorAll(".list > ul > li");
//     allNews.forEach((el, i) => {
//       if (i <= 60) {
//         data.push({
//           title: el.querySelector("h2.text")?.textContent,
//           date: el.querySelector(".time")?.textContent,
//           img: el.querySelector(".lazyimage")?.getAttribute("src"),
//           url: el.querySelector("a")?.getAttribute("href"),
//         });
//       } else {
//         return data;
//       }
//     });
//   });
//   await page.waitForFunction(
//     (result) => {
//       return result && result.length >= 20;
//     },
//     {},
//     result
//   );
//   await browser.close();
//   return result;
// };

// module.exports = tvbsScrap;
