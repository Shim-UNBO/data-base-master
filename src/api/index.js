import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.mever.me:8080',
});

export default instance;
