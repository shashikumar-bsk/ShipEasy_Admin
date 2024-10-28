import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';

// Function to get the authentication token and log it
const getAuthToken = (): string | undefined => {
  const token = Cookies.get('admintoken'); // Get token from cookies
  console.log('Retrieved token:', token); // Log the token
  return token;
};

// Post user data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postUserData = async (data:any) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'post',
      url: `${config}/api/v1/user/`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
      },
      data: newData
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};

// Get user data
export const getUserData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config}/api/v1/user/`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
      }
    });
    console.log(getAuthToken() )
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};

// Update user data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUserData = async (id: number, data: any) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'patch',
      url: `${config}/api/v1/user/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
      },
      data: newData
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};

// Delete user data
export const deleteUserData = async (id: number) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${config}/api/v1/user/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
      }
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};

// Change active status
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Change active status
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changeActiveStatusRouter = async (id: number,  active: boolean) => {
  const newData = JSON.stringify({ active: active });
  try {
    const response = await axios({
      method: 'patch',
      url: `${config}/api/v1/user/${id}/active`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
      },
      data: newData
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};

//Count user data
export const countUserData = async () => {
  try {
    const token = await getAuthToken()
    // console.log("token name",token)
    const response = await axios({
      method: 'get',
      url: `${config}/api/v1/user/5/counts`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Include token in headers
      }
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};

// Count total users
export const countTotalusers = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config}/api/v1/user/total/counts/all`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}` // Include token in headers
      }
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response ? error.response.data : { message: 'An error occurred' };
  }
};




