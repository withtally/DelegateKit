import * as puppeteer from "puppeteer";

export const fetchRenderedHtml = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Navigate to the desired URL
  await page.goto(url);

  // Execute scripts on the page
  await page.evaluate(() => {
    // Your custom scripts go here
    // For example, you can wait
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(null);
      }, 3_000); // 3 seconds to wait for ens resolution of image (like for lindajxie.eth)
    });
  });

  // Get the HTML content of the entire page
  const pageContent = await page.content();

  await browser.close();
  return pageContent;
};
