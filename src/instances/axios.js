import axios from 'axios';

const rootData = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/'
});
rootData.defaults.headers.common['X-Auth-Token'] = process.env.REACT_APP_FOOTBALL_DATA_API_KEY;

const newsData = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://content.guardianapis.com/'
});
newsData.defaults.headers.common['api-key'] = process.env.REACT_APP_GUARDIAN_NEWS_API_KEY;

export { rootData, newsData };