import axios from 'axios'
const api = axios.create({
baseURL:process.env.NODE_ENV || 'http://localhost:5000'
})
export default api;