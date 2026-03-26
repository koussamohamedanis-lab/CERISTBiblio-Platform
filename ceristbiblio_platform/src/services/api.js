import axios from 'axios'
const api = axios.create({
    baseURL : 'http://localhost:8000',// L'adresse de FastAPI
})
export const searchResearcher = (name) => api.get(`/api/researcher/${name}`);
export const getAuthorWorks = (authorId) => api.get(`/api/researcher/${authorId}/works`);