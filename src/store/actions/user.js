/** @format */

import { userActions } from '../slices/user';

const API_URL = 'http://192.168.1.42:9000';

// ********************************************************
// Function to fetch an user
// ********************************************************

export const fetchUserProfile = userId => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the loged in user
    // ********************************************************
    const fetchData = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/users/${userId}`);
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const userData = await fetchData();
      dispatch(userActions.setCurrenUserProfile({ user: userData.user }));
    } catch (error) {
      console.log(error);
    }
  };
};
