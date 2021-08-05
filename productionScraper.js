const puppeteer = require("puppeteer");
const scrapeJobListing = require("./scrapers/scrapeJobListing");

async function productionScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const jobDataConfig = [
    {
      type: "front-end-developer",
      city: "perth",
      searchLocation: "All-Perth-WA",
    },
    {
      type: "back-end-developer",
      city: "perth",
      searchLocation: "All-Perth-WA",
    },
    {
      type: "full-stack-developer",
      city: "perth",
      searchLocation: "All-Perth-WA",
    },
    {
      type: "front-end-developer",
      city: "melbourne",
      searchLocation: "All-Melbourne-VIC",
    },
    {
      type: "back-end-developer",
      city: "melbourne",
      searchLocation: "All-Melbourne-VIC",
    },
    {
      type: "full-stack-developer",
      city: "melbourne",
      searchLocation: "All-Melbourne-VIC",
    },
    {
      type: "front-end-developer",
      city: "sydney",
      searchLocation: "All-Sydney-NSW",
    },
    {
      type: "back-end-developer",
      city: "sydney",
      searchLocation: "All-Sydney-NSW",
    },
    {
      type: "full-stack-developer",
      city: "sydney",
      searchLocation: "All-Sydney-NSW",
    },
  ];

  () => {
    const lambdaDataArr = [];

    for (let i = 0; i < jobDataConfig.length; i++) {
      const jobsListingArr = await scrapeJobListing(page, {
        type: jobDataConfig[i].type,
        location: jobDataConfig[i].searchLocation,
      });

      lambdaDataArr.push({
        data: jobsListingArr,
        type: jobDataConfig[i].type,
        city: jobDataConfig[i].city,
      });
    }

    return lambdaDataArr;
  };

  await browser.close();
}

module.exports = productionScraper;
