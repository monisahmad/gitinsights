const fetchUserInfo = async (code) => {
  const server = process.env.REACT_APP_SERVER;
  const response = await fetch(`${server}${code}`);
  const data = await response.json();
  const access_token = data.split('=')[1].split('&')[0];
  const res = await fetch(`https://api.github.com/user?access_token=${access_token}`);
  const apiData = await res.json();
  return { apiData, access_token };
};

export default fetchUserInfo;
