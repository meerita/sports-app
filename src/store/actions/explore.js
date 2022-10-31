/** @format */
import { exploreActions } from '../slices/explore';

const API_URL = 'http://192.168.1.42:9000';

// ********************************************************
// Function to fetch the any logged user
// ********************************************************

export const fetchVisibleSports = () => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the loged in user
    // ********************************************************
    const fetchSports = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/sports`);
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
      const sportsData = await fetchSports();
      dispatch(
        exploreActions.fetchAllSports({
          sports: sportsData.sports.filter(sport => sport.visible === true),
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to fetch the any logged user
// ********************************************************

export const fetchGroupsBySport = sportId => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the loged in user
    // ********************************************************
    const fetchGroups = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/sports/${sportId}/groups`);
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
      const groupsData = await fetchGroups();
      dispatch(
        exploreActions.fetchGroupsBySport({
          // groups: sportsData.sports.filter(sport => sport.visible === true),
          groups: groupsData,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
