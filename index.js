const puppeteer = require("puppeteer");
const ObjectsToCsv = require("objects-to-csv");
const fs = require("fs");
const scrapeAllJobs = require("./scrapers/scrapeAllJobs");

(async () => {
  console.time("getdevjobs");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const date = new Date().toISOString().split("T")[0];
  const frontEndJobsPerth = await scrapeAllJobs(page, {
    type: "front-end-web-developer",
    location: "All-Perth-WA",
  });

  const frontEndJobsMelbourne = await scrapeAllJobs(page, {
    type: "front-end-web-developer",
    location: "All-Melbourne-VIC",
  });

  const frontEndJobsSydney = await scrapeAllJobs(page, {
    type: "front-end-web-developer",
    location: "All-Sydney-NSW",
  });

  //CREATES DIR IF DOESNT EXIST
  const dirs = [
    "./data-csv/perth",
    "./data-csv/melbourne",
    "./data-csv/sydney",
  ];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  //CREATES AND WRITES CSVs FROM DATA
  const perthFECsv = new ObjectsToCsv(frontEndJobsPerth);
  const melbourneFECsv = new ObjectsToCsv(frontEndJobsMelbourne);
  const sydneyFECsv = new ObjectsToCsv(frontEndJobsSydney);

  await perthFECsv.toDisk(`./data-csv/perth/front-end-perth_${date}.csv`);
  await melbourneFECsv.toDisk(
    `./data-csv/melbourne/front-end-melbourne_${date}.csv`
  );
  await sydneyFECsv.toDisk(`./data-csv/sydney/front-end-sydney_${date}.csv`);
  console.timeEnd("getdevjobs");
  await browser.close();
})();
