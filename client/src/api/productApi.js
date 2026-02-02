import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getAllProducts = async ({
    search = "",
    status = "ALL",
    price = "desc",
} = {}) => {
    try {
        const response = await api.get('/', {
            params: {
                search,
                status,
                price
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

const getProductById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
}

const addProduct = async (productData) => {
    try {
        const response = await api.post('/', productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

const updateProduct = async (id, productData) => {
    try {
        const response = await api.patch(`/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

export {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
