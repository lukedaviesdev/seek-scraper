const puppeteer = require("puppeteer");
const ObjectsToCsv = require("objects-to-csv");

import { scrapeAllJobs } from "./scrapers/scrapeAllJobs";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const frontEndJobsPerth = await scrapeAllJobs(page, {
    type: "front-end",
    location: "All-Perth-WA",
  });
  const frontEndJobsMelbourne = await scrapeAllJobs(page, {
    type: "front-end",
    location: "All-Melbourne-VIC",
  });

  const melbourneCsv = new ObjectsToCsv(frontEndJobsMelbourne);
  const perthCsv = new ObjectsToCsv(frontEndJobsPerth);

  await melbourneCsv.toDisk("./data-csv/melbourne/front-end-melbourne.csv");
  await perthCsv.toDisk("./data-csv/perth/front-end-perth.csv");

  await browser.close();
})();
