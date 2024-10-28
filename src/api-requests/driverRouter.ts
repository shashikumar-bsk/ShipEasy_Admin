/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
  };



export const postDriverData = async (data:any) => {
    const newData = JSON.stringify(data)
try {
    const response = await axios(
        {
            method:'post',
            url:`${config}/api/v1/driver/`,
            headers : {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

            },
            data: newData
        }
    )
    const responseData = await response.data
    return responseData
} catch (error:any) {
    return error.response.data
}    
}

export const getDriverData = async () => {
try {
    const response = await axios(
        {
            method:'get',
            url:`${config}/api/v1/driver/`,
            headers : {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

            },
        }
    )
    const responseData = await response.data
    return responseData
} catch (error:any) {
    return error.response.data
}    
}


export const updateDriverData = async (id: number, data: any) => {
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'patch',
            url: `${config}/api/v1/driver/${id}/upadate`,
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

export const deleteDriverData = async (id: number) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${config}/api/v1/driver/${id}`,
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

    
export const changeActiveStatusRouter = async (id: number, active: boolean) => {
    try {
        const response = await axios.patch(`${config}/api/v1/driver/${id}/active`, {
            active: active // Ensure 'active' is a boolean (true or false)
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
        throw new Error(`Error in changeActiveStatusRouter: ${error.message}`);
    }
};

export const countDriverData = async () => {
    try {
        const token = await getAuthToken()
        console.log("driver token is ",token)
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/driver/5/count`,
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

export const countTotalDrivers = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/driver/total/count/all`,
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

