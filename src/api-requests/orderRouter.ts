
import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';

const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken');
    console.log('Retrieved token:', token);
    return token;
};

// Fetch all orders with pagination
export const getAllOrders = async (currentPage: number, rowsPerPage: number) => {
    try {
        const response = await axios.get(`${config}/api/v1/order`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            },
            params: {
                page: currentPage,
                size: rowsPerPage
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching orders:", error);
        return error.response?.data || error.message;
    }
};

// Create a new order
export const postOrderData = async (data: any) => {
    try {
        const response = await axios.post(`${config}/api/v1/orders`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data || error.message;
    }
};

// Update an existing order by ID
export const updateOrderData = async (id: number, data: any) => {
    try {
        const response = await axios.put(`${config}/api/v1/orders/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data || error.message;
    }
};

// Delete an order by ID
export const deleteOrder = async (id: number) => {
    try {
        const response = await axios.delete(`${config}/api/v1/orders/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data || error.message;
    }
};

// Change order status
export const changeOrderStatus = async (id: number, status: string) => {
    try {
        const response = await axios.patch(`${config}/api/v1/orders/${id}/status`, { status }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data || error.message;
    }
};

// Count the total number of orders
export const countTotalOrders = async () => {
    try {
        const response = await axios.get(`${config}/api/v1/orders/total/count/all`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data || error.message;
    }
};

// Count orders by a specific status
export const countOrdersByStatus = async (status: string) => {
    try {
        const response = await axios.get(`${config}/api/v1/orders/count/${status}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data || error.message;
    }
};
