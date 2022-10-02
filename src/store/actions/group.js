/** @format */
import { groupActions } from '../slices/group';

const API_URL = 'http://192.168.1.48:8000';

// ********************************************************
// Function to fetch the any logged user
// ********************************************************

export const fetchCurrentGroup = id => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the group in user
    // ********************************************************
    const fetchGroup = async () => {
      console.log(id);
      // we call the API
      const response = await fetch(`${API_URL}/v1/groups/${id}`);
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();

      console.log('===============================');
      console.log('DATA FROM FIRST REQUEST TO API');
      console.log('===============================');
      console.log(data);

      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const groupData = await fetchGroup();
      console.log('===============================');
      console.log('DATA WE SEND TO STORE');
      console.log('===============================');
      console.log(groupData);
      await dispatch(
        groupActions.fetchGroup({
          group: groupData.group,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
