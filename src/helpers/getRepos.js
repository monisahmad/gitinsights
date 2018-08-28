import createRows from './createRows';

const getRepos = async (access_token) => {
  const res = await fetch(`https://api.github.com/user/repos?access_token=${access_token}`);
  const apiData = await res.json();
  const rows = createRows(apiData);
  return rows;
};

export default getRepos;
