import axios from 'axios';

const axiosInstance =  axios.create({
    baseURL: 'https://mia-react-burger-app-4038e.firebaseio.com'
})

export default axiosInstance;