/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
  };
export const createRideRequest = async (data: any) => {
    console.log(data);
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'post',
            url: `${config}/api/v1/riderequest`,
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

export const getRideRequestById = async (id: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/riderequest/details/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` 

            }
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};

// export const getRideRequestsByUser = async (userId: string) => {
//     try {
//         const response = await axios({
//             method: 'get',
//             url: `${config}/api/v1/riderequest/user/${userId}`,
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         const responseData = await response.data;
//         return responseData;
//     } catch (error: any) {
//         return error.response.data;
//     }
// };

export const updateRideRequest = async (id: string, data: any) => {
    console.log(data);
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'patch',
            url: `${config}/api/v1/riderequest/${id}`,
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

export const deleteRideRequest = async (id: number) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${config}/api/v1/riderequest/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` 

            }
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};



export const getAllRideRequest = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/riderequest`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` 

            }
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
}; 

export const getAllRideDetails = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/riderequest/ride-requests/completed`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}` 

            }
        });
        const responseData = await response.data;
        return responseData;
    } catch (error: any) {
        return error.response.data;
    }
};