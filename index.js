const seekJobAdData = require("./scrapers/seek");
const jobAdConfig = require("./scrapers/seek/jobAdConfig");

seekJobAdData({
  exportType: "json",
  jobDataConfig: [
    {
      type: jobAdConfig.JOBTYPE_FRONTEND,
      city: "remote",
      searchLocation: jobAdConfig.JOBLOCATION_REMOTE,
    },
    {
      type: jobAdConfig.JOBTYPE_REACT,
      city: "remote",
      searchLocation: jobAdConfig.JOBLOCATION_REMOTE,
    },
    {
      type: jobAdConfig.JOBTYPE_FRONTEND,
      city: "perth",
      searchLocation: jobAdConfig.JOBLOCATION_PERTH,
    },
    {
      type: jobAdConfig.JOBTYPE_REACT,
      city: "perth",
      searchLocation: jobAdConfig.JOBLOCATION_PERTH,
    },
    {
      type: jobAdConfig.JOBTYPE_FRONTEND,
      city: "melbourne",
      searchLocation: jobAdConfig.JOBLOCATION_MELBOURNE,
    },
    {
      type: jobAdConfig.JOBTYPE_REACT,
      city: "melbourne",
      searchLocation: jobAdConfig.JOBLOCATION_MELBOURNE,
    },
  ],
});
