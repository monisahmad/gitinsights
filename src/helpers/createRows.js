const createRows = (repos) => {
  const res = repos.map((repo, index) => {
    const { name, updated_at, html_url } = repo;
    const date = new Date(updated_at).toLocaleDateString();
    const remap = {
      index,
      name,
      updated_at: date,
      html_url,
    };
    return remap;
  });
  return res;
};

export default createRows;
