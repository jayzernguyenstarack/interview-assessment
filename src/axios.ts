import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: '' });

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
