const ObjectsToCsv = require("objects-to-csv");

async function writeToCsv({ jobsListingArr, type, city, date }) {
  const csv = new ObjectsToCsv(jobsListingArr);
  await csv.toDisk(`./data/csv/${city}/${type}_${city}_${date}.csv`);
}

module.exports = writeToCsv;
