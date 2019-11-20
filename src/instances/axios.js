import axios from 'axios';

const rootData = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/'
});
rootData.defaults.headers.common['X-Auth-Token'] = 'Register for your free API Key and paste it here - https://www.football-data.org/';

const newsData = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://content.guardianapis.com/'
});
newsData.defaults.headers.common['api-key'] = 'Register for your free API Key and paste it here - https://open-platform.theguardian.com/access/';

export { rootData, newsData };