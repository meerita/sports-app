/** @format */
import { themeActions } from '../slices/theme';

const API_URL = 'http://192.168.1.48:8000';

// ********************************************************
// Function to fetch the any logged user
// ********************************************************

export const changeMyDarkMode = darkMode => {
  return async (dispatch, getState) => {
    const currentDarkMode = getState().theme.darkMode;
    const userId = getState().me.myData._id;

    // If the current state equals to the requested, no need to perform
    // the request to the server
    if (currentDarkMode === darkMode) {
      return;
    }

    // ********************************************************
    // Function to patch the darkMode of the user
    // ********************************************************
    const patchUserTheme = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/users/${userId}/darkMode`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: darkMode,
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

    try {
      const darkModeData = await patchUserTheme();
      dispatch(themeActions.changeTheme({ darkMode: darkModeData.theme }));
    } catch (error) {
      console.log(error);
    }
  };
};
