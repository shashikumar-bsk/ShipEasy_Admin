import axios from 'axios';
import config from './config';
import Cookies from 'js-cookie';
const getAuthToken = (): string | undefined => {
  const token = Cookies.get('admintoken'); // Get token from cookies
  console.log('Retrieved token:', token); // Log the token
  return token;
};


export const getNewNotifications = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:3000/api/v1/firebase/getAllNewnotification`,
      params: { page, limit },
      headers: {
        "Content-Type": "application/json"
        //   "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      }
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};


// Mark a notification as read
export const markUserNotificationAsRead = async (id: any,type:any) => {
  // const token = Cookies.get(userCookie);

  try {
    const response = await axios({
      method: 'patch',
      url: `http://localhost:3000/api/v1/firebase/notifications/${id}/${type}/read`,
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

    });
    return response.data;
  } catch (error: any) {
    // handleError(error);
  }
};


export const fetchUserNotificationsAll = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:3000/api/v1/firebase/getAllnotifications`,
      params: { page, limit },
      headers: {
        "Content-Type": "application/json"
        //   "Authorization": `Bearer ${getAuthToken()}` // Include token in headers

      }
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    return error.response.data;
  }
};
