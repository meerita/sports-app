/** @format */

import event, { eventActions } from '../slices/event';

const API_URL = 'http://192.168.1.48:8000';

// ********************************************************
// Function to fetch an user
// ********************************************************

export const fetchEventDetail = eventId => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const fetchEventData = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/events/${eventId}`);
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
      const fetchData = await fetchEventData();
      dispatch(eventActions.addEventDetail({ event: fetchData.event }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeCustomEventVisibility = data => {
  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    const { eventId, groupId } = data;
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/visibility/change`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: adminId,
            groupId: groupId,
          }),
        }
      );
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
      const updatedEventData = await changeEventData();
      dispatch(
        eventActions.changeVisibility({
          visibility: updatedEventData.visibility,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeEventSkillRequirement = data => {
  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    const { eventId, groupId, skill } = data;

    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/skill/change`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: adminId,
            groupId: groupId,
            skill: skill,
          }),
        }
      );
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
      const updatedEventData = await changeEventData();
      dispatch(
        eventActions.changeSkill({
          skill: skill,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeEventGenderRequirement = data => {
  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    const { eventId, groupId, gender } = data;

    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/gender/change`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: adminId,
            groupId: groupId,
            gender: gender,
          }),
        }
      );
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
      const updatedEventData = await changeEventData();
      dispatch(
        eventActions.changeGender({
          gender: gender,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
