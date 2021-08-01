const jobInfoPerPageQuery = require("../queries/jobInfoPerPageQuery");
const pageCountQuery = require("../queries/pageCountQuery");

async function getPageCount(page, url) {
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  let pages = await page.evaluate(pageCountQuery);
  return pages;
}

async function getJobDataPerPage(page, url) {
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  let data = await page.evaluate(jobInfoPerPageQuery);

  return data;
}

async function scrapeJobListing(page, { type, location }) {
  const allJobsArr = [];

  const pageCount = await getPageCount(
    page,
    `https://www.seek.com.au/${type}-jobs/in-${location}?salaryrange=100000-999999&salarytype=annual`
  );

  for (let i = 1; i <= pageCount; i++) {
    const jobsPerPage = await getJobDataPerPage(
      page,
      `https://www.seek.com.au/${type}-jobs/in-${location}?page=${i}&salaryrange=100000-999999&salarytype=annual`
    );
    allJobsArr.push(...jobsPerPage);
  }
  return allJobsArr;
}

module.exports = scrapeJobListing;
