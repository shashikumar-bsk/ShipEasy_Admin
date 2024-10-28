/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
  };


// Send OTP to driver
export const sendDriverOTP = async (phone: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${config}/api/v1/driver-otp/send-otp`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      },
      data: { phone }
    });
    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    return error.response.data;
  }
};

// Verify OTP
export const verifyDriverOTP = async (phone: string, otp: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${config}/api/v1/driver-otp/verify-otp`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      },
      data: { phone, otp }
    });
    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    return error.response.data;
  }
};

// Fetch driver details by phone number
export const checkDriverByPhone = async (phoneNumber: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config}/api/v1/driver-otp/check-driver`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      },
      params: { phoneNumber }
    });
    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    return error.response.data;
  }
};
