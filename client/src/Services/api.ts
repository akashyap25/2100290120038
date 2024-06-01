import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface Product {
    id: string;
    productName: string;
    company: string;
    category: string;
    price: number;
    rating: number;
    discount: number;
    availability: string;
}

export const getProducts = (category: string, params: Record<string, any>) => {
    return axios.get<Product[]>(`${API_BASE_URL}/categories/${category}/products`, { params });
};

export const getProductDetails = (category: string, productId: string) => {
    return axios.get<Product>(`${API_BASE_URL}/categories/${category}/products/${productId}`);
};
