/** @format */

import { generalActions } from '../slices/general';

const API_URL = 'http://192.168.1.48:8000';

export const fetchGlobalVariables = () => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the loged in user
    // ********************************************************
    const fetchVariables = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/general`);
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
      const globalVariables = await fetchVariables();
      dispatch(
        generalActions.updateVariables({
          currentUpdatedTerms: globalVariables.currentUpdatedTerms,
          version: globalVariables.version,
          login: globalVariables.login,
          register: globalVariables.register,
          maintenance: globalVariables.maintenance,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
