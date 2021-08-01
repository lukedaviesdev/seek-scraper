const jobInfoPerPageQuery = () => {
  function subtractDaysFromDate(date, days) {
    const res = new Date(date);
    res.setDate(res.getDate() - days);
    return res;
  }

  function formatDate(string) {
    let daysAgo = parseInt(string.split("d")[0]);
    return subtractDaysFromDate(new Date(), daysAgo).toISOString();
  }

  const titleElems = document.querySelectorAll('a[data-automation="jobTitle"]');
  const companyElems = document.querySelectorAll(
    'a[data-automation="jobCompany"]'
  );
  const shortDescriptionElems = document.querySelectorAll(
    'span[data-automation="jobShortDescription"]'
  );
  const listingDateElems = document.querySelectorAll(
    'span[data-automation="jobListingDate"]'
  );

  const perPage = parseInt(titleElems.length);

  const jobsArr = [];

  for (let i = 0; i < perPage; i++) {
    let jobObject = {
      title: "",
      company: "",
      description: "",
      link: "",
      listedOn: "",
    };

    //can add some QA here on the search results,eg skip jobs with titles containing c++

    jobObject.title = titleElems[i] && titleElems[i].innerHTML;
    jobObject.company = companyElems[i] && companyElems[i].innerHTML;
    jobObject.description =
      shortDescriptionElems[i] && shortDescriptionElems[i].innerText;
    jobObject.link = titleElems[i] && titleElems[i].href;
    jobObject.listedOn =
      listingDateElems[i] && formatDate(listingDateElems[i].innerText);

    jobsArr.push(jobObject);
  }

  return jobsArr;
};

module.exports = jobInfoPerPageQuery;
