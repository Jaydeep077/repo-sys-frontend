import axiosInstance from '../utils/axiosConfig';

const fileService = {
  listFiles: async (repoId) => {
    const response = await axiosInstance.get(`/repositories/${repoId}/files`);
    return response.data;
  },

  uploadFile: async (repoId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post(`/repositories/${repoId}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  downloadFile: async (repoId, fileId) => {
    const response = await axiosInstance.get(
      `/repositories/${repoId}/files/${fileId}/download`,
      { responseType: 'blob' }
    );
    return response.data;
  }

  
};

export default fileService;
