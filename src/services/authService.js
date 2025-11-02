import axiosInstance from '../utils/axiosConfig';

const authService = {
    register: async (username, email, password) => {
        try {
            const response = await axiosInstance.post('/auth/signup', {
                username,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    login: async (username, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password,
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                }));
            }
            
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    },
};

export default authService;
