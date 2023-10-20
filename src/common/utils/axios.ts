/**
 * axios setup to use mock service
 */

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

// console.log('>>>Check URL API:', process.env.APP_API_URL);

const instance: AxiosInstance = axios.create({
    baseURL: process.env.APP_API_URL
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});
//

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        const access_token = window.localStorage.getItem('serviceToken') || '';
        config.headers['Authorization'] = `Bearer ${access_token}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error: AxiosError) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log('>>>Check response:', response);
        return response && response.data ? response.data : response;
    },
    (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log('>>>Check response:', error);
        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    }
);

export default instance;
