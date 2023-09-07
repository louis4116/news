// const puppeteer = require("puppeteer");
// const autoScroll = require("../../util/autoScroll");
// const etTodayScrapy = async (id) => {
//   const broswer = await puppeteer.launch({
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
//   const page = await broswer.newPage();
//   await page.goto(`https://www.ettoday.net/news/focus/${id}/`);

//   await page.setRequestInterception(true);
//   page.on("request", (request) => {
//     if (request.resourceType() === "image") request.abort();
//     else request.continue();
//   });
//   await autoScroll({ page, dis: 3000, max: 6 });
//   const result = await page.evaluate(() => {
//     let data = [];
//     let newsSection = document.querySelector(".part_pictxt_3.lazyload");
//     let newsList = newsSection.querySelectorAll(".piece.clearfix");
//     newsList.forEach((el, i) => {
//       data.push({
//         title: newsList[i].querySelector("h3").textContent,
//         date: newsList[i].querySelector(".date").textContent,
//         url: newsList[i].querySelector("a").getAttribute("href"),
//         img: newsList[i].querySelector(".pic img").getAttribute("src"),
//         summary: newsList[i].querySelector(".summary").textContent,
//       });
//     });
//     return data;
//   });
//   return result;
// };

// module.exports = etTodayScrapy;
