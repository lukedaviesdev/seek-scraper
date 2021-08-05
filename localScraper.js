const puppeteer = require("puppeteer");
const writeToJSON = require("./helpers/writeToJSON");
const fs = require("fs");
const scrapeJobListing = require("./scrapers/scrapeJobListing");

async function localScraper(props) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const jobDataConfig = [
    {
      type: "front-end-web-developer",
      city: "perth",
      searchLocation: "All-Perth-WA",
    },
    {
      type: "full-stack-web-developer",
      city: "perth",
      searchLocation: "All-Perth-WA",
    },
    {
      type: "front-end-web-developer",
      city: "melbourne",
      searchLocation: "All-Melbourne-VIC",
    },
    {
      type: "full-stack-web-developer",
      city: "melbourne",
      searchLocation: "All-Melbourne-VIC",
    },
    {
      type: "front-end-web-developer",
      city: "sydney",
      searchLocation: "All-Sydney-NSW",
    },
    {
      type: "full-stack-web-developer",
      city: "sydney",
      searchLocation: "All-Sydney-NSW",
    },
  ];

  for (let i = 0; i < jobDataConfig.length; i++) {
    if (!fs.existsSync(`./data-json/${jobDataConfig[i].city}`)) {
      fs.mkdirSync(`./data-json/${jobDataConfig[i].city}`, { recursive: true });
    }
    const jobsListingArr = await scrapeJobListing(page, {
      type: jobDataConfig[i].type,
      location: jobDataConfig[i].searchLocation,
    });

    writeToJSON({
      jobsListingArr,
      type: jobDataConfig[i].type,
      city: jobDataConfig[i].city,
    });
  }

  await browser.close();
}

module.exports = localScraper;
