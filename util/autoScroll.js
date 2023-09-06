const autoScroll = async ({ page, dis, max }) => {
  await page.evaluate(
    async (dis, max) => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        let scroll = 0;
        let timer = setInterval(() => {
          window.scrollBy(0, dis);
          totalHeight += dis;
          scroll++;
          if (scroll >= max) {
            clearInterval(timer);
            resolve();
          }
        }, 300);
      });
    },
    dis,
    max
  );
};

module.exports = autoScroll;
