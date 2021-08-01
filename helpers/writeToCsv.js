const ObjectsToCsv = require("objects-to-csv");

async function writeToCsv({ jobsListingArr, type, city }) {
  const date = new Date().toISOString().split("T")[0];
  const csv = new ObjectsToCsv(jobsListingArr);
  await csv.toDisk(`./data-csv/${city}/${type}-${city}_${date}.csv`);
}

module.exports = writeToCsv;
