import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/analytics`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
    'Content-Type': 'application/json',
  },
})


const analytics = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        throw error;
    }
}

export { analytics };