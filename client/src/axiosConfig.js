import axios from 'axios';

let token = localStorage.getItem('JWS_TOKEN');
axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.headers.common = {'x-access-token': token}

export default axios;