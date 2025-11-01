import axios from 'axios';

let baseUrl;

if (process.env.DEV) {
  baseUrl = `${process.env.API_URL}:${process.env.API_PORT}`;
} else {
  baseUrl = `${process.env.API_URL}`;
}

axios.defaults.baseURL = `${baseUrl}`;

export const api = axios.create({
  baseURL: `${baseUrl}/api`,
  paramsSerializer: (params) => {
    const flattened = params?.params ? params.params : params;
    return new URLSearchParams(flattened).toString();
  },
  withCredentials: true,
});

export { axios };
