/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
  };




export const postBookingData = async (data:any) => {
    const newData = JSON.stringify(data)
try {
    const response = await axios(
        {
            method:'post',
            url:`${config}/api/v1/booking/`,
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

export const getBookingData = async (user_id: number) => {
try {
    const response = await axios(
        {
            method:'get',
            url:`${config}/api/v1/booking/user/${user_id}`,
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

export const getAllBookings = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config}/api/v1/booking`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      },
    });
    const responseData = response.data; 
    return responseData;
  } catch (error: any) {
    return error.response.data;
  }
};


export const updateBookingData = async (id: number, data: any) => {
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'put',
            url: `${config}/api/v1/booking/${id}`,
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

export const deleteBookingData = async (id: number) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${config}/api/v1/booking/${id}`,
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