import axiosInstance from '../utils/axiosConfig';

const repositoryService = {
    getAllRepositories: async () => {
        try {
            const response = await axiosInstance.get('/repositories');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getRepositoryById: async (id) => {
        try {
            const response = await axiosInstance.get(`/repositories/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createRepository: async (repositoryData) => {
        try {
            const response = await axiosInstance.post('/repositories', repositoryData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateRepository: async (id, repositoryData) => {
        try {
            const response = await axiosInstance.put(`/repositories/${id}`, repositoryData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteRepository: async (id) => {
        try {
            const response = await axiosInstance.delete(`/repositories/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default repositoryService;
