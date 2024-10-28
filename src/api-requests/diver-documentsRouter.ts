/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
  };



export const postDiverDocumentData = async (data:any) => {
    const newData = JSON.stringify(data)
try {
    const response = await axios(
        {
            method:'post',
            url:`${config}/api/v1/driverdoc/`,
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

  export const getDriverDocs = async (id: any) => {
    
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/driverdoc/driver/${id}`,
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

export const getDriverDocsAll = async () => {
    
    try {
        const response = await axios({
            method: 'get',
            url: `${config}/api/v1/driverdoc`,
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


export const updateDriverDocumentData = async (id: number, data: any) => {
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'put',
            url: `${config}/api/v1/driverdoc/${id}`,
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

export const deleteDriverDocumentData = async (id: number) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${config}/api/v1/driverdoc/${id}`,
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

  
export const acceptDocument = async (id: number) => {
    
    try {
        const response = await axios({
            method: 'patch',
            url: `${config}/api/v1/driverdoc/accept/${id}`,
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