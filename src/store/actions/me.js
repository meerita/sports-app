/** @format */
import { meActions } from '../slices/me';
import { themeActions } from '../slices/theme';

const API_URL = 'http://192.168.1.48:8000';

// ********************************************************
// Function to fetch the any logged user
// ********************************************************

export const fetchMyUser = userId => {
  return async dispatch => {
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
      dispatch(
        themeActions.changeTheme({
          darkMode: userData.user.settings.preferences.theme,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the WEIGHT on the USER
// ********************************************************

export const changeMyWeight = weight => {
  const userWeight = weight;
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    console.log('userID del peso que quiero cambiar: ' + userId);
    // ********************************************************
    // Function to PATCH the WEIGHT of the USER
    // ********************************************************
    const editMyWeight = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/users/${userId}/weight`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight: userWeight,
        }),
      });
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
      const weightUserData = await editMyWeight();
      dispatch(meActions.changeMyWeight({ weight: weightUserData.weight }));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the HEIGHT on the USER
// ********************************************************

export const changeMyHeight = height => {
  const userHeight = height;
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the HEIGHT of the USER
    // ********************************************************
    const editMyHeight = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/users/${userId}/height`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: userHeight,
        }),
      });
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
      const heightUserData = await editMyHeight();
      dispatch(meActions.changeMyHeight({ height: heightUserData.height }));
    } catch (error) {
      console.log(error);
    }
  };
};
