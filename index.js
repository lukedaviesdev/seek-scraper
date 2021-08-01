const puppeteer = require("puppeteer");
import { jobInfoPerPageQuery } from "./queries/jobInfoPerPageQuery";
import { pageCountQuery } from "./queries/pageCountQuery";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  async function getPageCount(url) {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    let pages = await page.evaluate(pageCountQuery);
    return pages;
  }

  async function getJobDataPerPage(url) {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    let data = await page.evaluate(jobInfoPerPageQuery);

    return data;
  }

  async function getJobs({ type, location }) {
    const allJobsArr = [];

    const pageCount = await getPageCount(
      `https://www.seek.com.au/${type}-web-developer-jobs/in-${location}?salaryrange=100000-999999&salarytype=annual`
    );

    for (let i = 1; i <= pageCount; i++) {
      const jobsPerPage = await getJobDataPerPage(
        `https://www.seek.com.au/${type}-web-developer-jobs/in-${location}?page=${i}&salaryrange=100000-999999&salarytype=annual`
      );
      allJobsArr.push(...jobsPerPage);
    }
    return allJobsArr;
  }

  const frontEndJobsPerth = await getJobs({
    type: "front-end",
    location: "All-Perth-WA",
  });
  const frontEndJobsMelbourne = await getJobs({
    type: "front-end",
    location: "All-Melbourne-VIC",
  });

  //   const backEndJobs = await getJobs("back-end");
  //   const fullstackJobs = await getJobs("full-stack");

  console.log(frontEndJobsMelbourne);
  await browser.close();
})();
