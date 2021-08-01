const puppeteer = require("puppeteer");
const writeToCsv = require("./helpers/writeToCsv");
const fs = require("fs");
const scrapeJobListing = require("./scrapers/scrapeJobListing");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const frontEndJobsPerth = await scrapeJobListing(page, {
    type: "front-end-web-developer",
    location: "All-Perth-WA",
  });

  const frontEndJobsMelbourne = await scrapeJobListing(page, {
    type: "front-end-web-developer",
    location: "All-Melbourne-VIC",
  });

  const frontEndJobsSydney = await scrapeJobListing(page, {
    type: "front-end-web-developer",
    location: "All-Sydney-NSW",
  });

  const jobDataConfig = [
    {
      directory: "./data-csv/perth",
      type: "front-end",
      city: "perth",
      jobListings: frontEndJobsPerth,
    },
    {
      directory: "./data-csv/melbourne",
      type: "front-end",
      city: "melbourne",
      jobListings: frontEndJobsMelbourne,
    },
    {
      directory: "./data-csv/sydney",
      type: "front-end",
      city: "sydney",
      jobListings: frontEndJobsSydney,
    },
  ];

  jobDataConfig.forEach((option) => {
    if (!fs.existsSync(option.directory)) {
      fs.mkdirSync(option.directory, { recursive: true });
    }
    writeToCsv({
      jobsListingArr: option.jobListings,
      type: option.type,
      city: option.city,
    });
  });

  await browser.close();
})();
