/** @format */
import { meActions } from '../slices/me';

const API_URL = process.env.API_URL;

// ********************************************************
// Function to fetch the any logged user
// ********************************************************

export const fetchMyUser = userId => {
  return async dispatch => {
    console.log('el user id' + userId);
    // ********************************************************
    // Function to fetch the loged in user
    // ********************************************************
    const fetchUserData = async () => {
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
      const userData = await fetchUserData();
      dispatch(meActions.addMyUser({ user: userData.user }));
      dispatch(meActions.addMyGroups({ groups: userData.user.groups }));
    } catch (error) {
      console.log(error);
    }
  };
};
