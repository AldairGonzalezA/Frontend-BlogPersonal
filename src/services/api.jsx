import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/blog/v1/',
    timeout: 5000
})

export const getCourses = async () => {
    try {
        return await apiClient.get('/course')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getPublications = async (id) => {
    try {
        return await apiClient.get(`/publication/${id}`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}