import axios from 'axios'
const api = axios.create({
    baseURL : 'http://localhost:8000',// L'adresse de FastAPI
})
export const searchResearcher = (name) => api.get(`/routers/search/researcher/${name}`);