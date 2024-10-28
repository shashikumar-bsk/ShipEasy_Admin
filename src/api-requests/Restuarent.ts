import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';

// Function to get the authentication token
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
};

// POST request to add a new restaurant
export const postRestaurantData = async (data: any) => {
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'post',
            url: `${config}/api/v1/restaurant/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            },
            data: newData
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};

// GET request to retrieve all restaurants
export const getRestaurantData = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/restaurant/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            },
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};

// Patch request to update a restaurant's data
export const updateRestaurantData = async (id: number, data: any) => {
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'patch',
            url: `${config}/api/v1/restaurant/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` 
            },
            data: newData
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};

// DELETE request to remove a restaurant
export const deleteRestaurantData = async (id: number) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${config}/api/v1/restaurant/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            }
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};

// PATCH request to change the status of a restaurant (e.g., active/inactive)
export const changeRestaurantStatus = async (id: number, status: boolean) => {
    try {
        const response = await axios.patch(`${config}/api/v1/restaurant/${id}/status`, {
            status: status // Ensure 'status' is a boolean (true or false)
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            }
        });
        return response.data; // Return the response data directly
    } catch (error: any) {
        // Handle errors and log them for debugging
        if (error.response) {
            console.error("Error response status:", error.response.status);
            console.error("Error response data:", error.response.data);
            return error.response.data; // Return the error response data
        } else if (error.request) {
            console.error("Error in request:", error.request);
        } else {
            console.error("Error:", error.message);
        }
        throw new Error(`Error in changeRestaurantStatus: ${error.message}`);
    }
};

// GET request to count the number of restaurants with a specific status
export const countRestaurantData = async () => {
    try {
        const token = await getAuthToken();
        console.log("restaurant token is ", token);
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/restaurant/5/count`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include token in headers
            }
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};

// GET request to count the total number of restaurants
export const countTotalRestaurants = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/restaurant/total/count/all`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            }
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};
