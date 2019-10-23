import axios from 'axios';

const rootInstance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/'
});
rootInstance.defaults.headers.common['X-Auth-Token'] = 'get your API Key from https://www.football-data.org/';

export default rootInstance;