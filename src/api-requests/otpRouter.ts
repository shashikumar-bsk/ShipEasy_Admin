/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
  };


export const sendOTP = async (phone: string) => {
    try {
        const response = await axios.post(
            `${config}/api/v1/otp/send-otp`,
            { phone },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

                }
            }
        );
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const verifyOTP = async (phone: string, otp: string) => {
    try {
        const response = await axios.post(
            `${config}/api/v1/otp/verify-otp`,
            { phone, otp },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

                }
            }
        );
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};
