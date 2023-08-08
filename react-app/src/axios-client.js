import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BUDDY_MOVIE_URL
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const response = error.response.data;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN');
  }
  return Promise.reject(error);
});

export default axiosClient;