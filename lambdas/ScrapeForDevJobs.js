const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const productionScraper = require("production-scraper");

const content = productionScraper();

const params = {
  Body: content,
  Bucket: "devjobs-dump",
  Key: "developer-jobs_2021-08-05.json",
};

exports.handler = async (event) => {
  await s3
    .putObject(params, function (err, data) {
      if (err)
        console.log({ status: "unsuccessful", error: err, stack: err.stack });
      // an error occurred
      else console.log({ status: "successful", data: data }); // successful response
    })
    .promise();
};
