import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';
const getAuthToken = (): string | undefined => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('Retrieved token:', token); // Log the token
    return token;
  };


// Create a new admin
export const createAdmin = async (data) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'post',
      url: `${config}/api/v1/admin/`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      },
      data: newData
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};

// Admin login
export const loginAdmin = async (data) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'post',
      url: `${config}/api/v1/admin/login`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      },
      data: newData
    });
    const responseData = await response.data;
    console.log(response.data)
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};

//Admin forgotpassword
export const AdminForgetPassword = async (data) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'post',
      url: `${config}/api/v1/admin/send-otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: newData
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};


///resend otp is same as "sendotp"
export const ResendOtp = async (data) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'post',
      url: `${config}/api/v1/admin/send-otp`,
      headers: {
        "Content-Type": "application/json"
      },
      data: newData
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};

//Admin Confirmpassword

export const Adminconfirmpassword = async (data) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'patch',
      url: `${config}/api/v1/admin/reset-password/password`,
      headers: {
        "Content-Type": "application/json",
         // Include token in headers

      },
      data: newData
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};

//Verify password

export const VerifyPage = async (data) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'post',
      url: `${config}/api/v1/admin/verify-otp`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
      },
      data: newData
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};

// Get admin by ID
export const getAdminById = async (id: number) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config}/api/v1/admin/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      }
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};

// Get all admins
export const getAllAdmins= async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config}/api/v1/admin/`,
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      }
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};

// Update admin
export const updateAdmin = async (id: number, data) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'patch',
      url: `${config}/api/v1/admin/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      },
      data: newData
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};

// Delete admin
export const deleteAdmin = async (id: number) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${config}/api/v1/admin/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      }
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};


