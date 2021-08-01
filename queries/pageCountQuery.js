export const pageCountQuery = () => {
  const titleElems = document.querySelectorAll('a[data-automation="jobTitle"]');
  const totalJobCount = parseInt(
    document.querySelector('strong[data-automation="totalJobsCount"]').innerText
  );

  const perPage = parseInt(titleElems.length);
  const pages = Math.ceil(totalJobCount / perPage);
  return pages;
};
