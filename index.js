const puppeteer = require("puppeteer");
const ObjectsToCsv = require("objects-to-csv");
const fs = require("fs");

import { scrapeAllJobs } from "./scrapers/scrapeAllJobs";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const frontEndJobsPerth = await scrapeAllJobs(page, {
    type: "front-end-web-developer",
    location: "All-Perth-WA",
  });

  const frontEndJobsMelbourne = await scrapeAllJobs(page, {
    type: "front-end-web-developer",
    location: "All-Melbourne-VIC",
  });

  //CREATES DIR IF DOESNT EXIST
  const dirs = ["./data-csv/melbourne", "./data-csv/perth"];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  //CREATES AND WRITES CSVs FROM DATA
  const melbourneFECsv = new ObjectsToCsv(frontEndJobsMelbourne);
  const perthFECsv = new ObjectsToCsv(frontEndJobsPerth);

  await melbourneFECsv.toDisk("./data-csv/melbourne/front-end-melbourne.csv");
  await perthFECsv.toDisk("./data-csv/perth/front-end-perth.csv");

  await browser.close();
})();
