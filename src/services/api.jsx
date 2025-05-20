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

export const createComment = async (data) => {
    try {
        return await apiClient.post(`/publication/comment`,data);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateComment = async (id, data) => {
    try {
        return await apiClient.put(`/publication/comment/${id}`, data);
    } catch (error) {
        return {
            error: true,
            e
        }
    }
}

export const deleteComment = async (id) => {
    try {
        return await apiClient.delete(`/publication/comment/${id}`);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}