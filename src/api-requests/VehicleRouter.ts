import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';

// Function to get the authentication token
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
};

// POST request to add a new vehicle
export const postVehicleData = async (data: any) => {
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'post',
            url: `${config}/api/v1/vehicle-type/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            },
            data: newData
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

// GET request to retrieve all vehicles
export const getVehicleData = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/vehicle-type/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            },
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

// PATCH request to update a vehicle's data
export const updateVehicleData = async (id: number, data: any) => {
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'put',
            url: `${config}/api/v1/vehicle-type/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            },
            data: newData
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

// DELETE request to remove a vehicle
export const deleteVehicleData = async (id: number) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${config}/api/v1/vehicle-type/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

// PATCH request to change the status of a vehicle (e.g., active/inactive)
export const changeVehicleStatus = async (id: number, status: boolean) => {
    try {
        const response = await axios.patch(`${config}/api/v1/vehicle-type/${id}/status`, {
            status: status // Ensure 'status' is a boolean (true or false)
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Error response status:", error.response.status);
            console.error("Error response data:", error.response.data);
            return error.response.data;
        } else if (error.request) {
            console.error("Error in request:", error.request);
        } else {
            console.error("Error:", error.message);
        }
        throw new Error(`Error in changeVehicleStatus: ${error.message}`);
    }
};

// GET request to count the number of vehicles with a specific status
export const countVehicleData = async () => {
    try {
        const token = await getAuthToken();
        console.log("Vehicle token is ", token);
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/vehicle-type/5/count`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include token in headers
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

// GET request to count the total number of vehicles
export const countTotalVehicles = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/vehicle-type/total/count/all`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

