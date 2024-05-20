import { webkit } from "playwright";
export const fetchRenderedHtml = async (url: string): Promise<string> => {
  // Launch the browser (in this case, 'firefox' for faster installation)
  //   const browser = await firefox.launch({ headless: false });
  const browser = await webkit.launch();

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();
  // Navigate to the desired URL
  await page.goto(url);

  // Execute scripts on the page
  await page.evaluate(() => {
    // Your custom scripts go here
    // For example, you can wait for 5 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(null);
      }, 3_000); // 3 seconds to wait for ens resolution of image (like for lindajxie.eth)
    });
  });

  // Get the HTML content of the entire page
  const pageContent = await page.content();

  // Close the browser
  await browser.close();
  return pageContent;
};
