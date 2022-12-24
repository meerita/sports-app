/** @format */

import { eventActions } from '../slices/event';
import { getGroupEvents } from './group';
import { fetchMyEvents } from './me';

const API_URL = 'http://192.168.1.73:9000';

// ********************************************************
// Function to fetch an event
// ********************************************************

export const fetchLatestEvents = () => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const fetchData = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/events/latest`);
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
      const fetchDataResponse = await fetchData();
      dispatch(
        eventActions.addLatestEvents({ latestEvents: fetchDataResponse })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

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

export const changeEventInvitations = data => {
  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    const { eventId, groupId, allowInvitations } = data;

    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/invitations/change`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: adminId,
            groupId: groupId,
            allowInvitations: allowInvitations,
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
        eventActions.changeInvitations({
          allowInvitations: allowInvitations,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeEventParticipation = data => {
  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    const { eventId, groupId, allowedParticipants } = data;
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/participation/change`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: adminId,
            groupId: groupId,
            allowedParticipants: allowedParticipants,
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
        eventActions.changeParticipation({
          allowedParticipants: updatedEventData.allowedParticipants,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeEventActivity = data => {
  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    const { eventId, groupId, activity, maxParticipants } = data;
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/activity/change`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: adminId,
            groupId: groupId,
            activity: activity,
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
        eventActions.changeActivity({
          activity: updatedEventData.activity,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeEventMaxParticipants = data => {
  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    const { eventId, groupId, maxParticipants } = data;
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/participants/change`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: adminId,
            groupId: groupId,
            maxParticipants: maxParticipants,
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
        eventActions.changeMaxParticipants({
          maxParticipants: updatedEventData.maxParticipants,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const closeEvent = data => {
  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    const { eventId, groupId } = data;
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/events/${eventId}/close`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId: adminId,
          groupId: groupId,
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
      const updatedEventData = await changeEventData();
      dispatch(
        eventActions.changeEventOpeness({
          open: updatedEventData.open,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const joinMeThisEventAsParticipant = data => {
  const { participantId, proposerId, groupId, gender, eventId } = data;
  return async (dispatch, getState) => {
    const me = getState().me.myData;

    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/participants/add`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            proposerId: proposerId,
            participantId: participantId,
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
      const changedEvent = await changeEventData();
      await dispatch(fetchEventDetail(eventId));
      await dispatch(fetchMyEvents(me._id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const leaveMeThisEventAsParticipant = data => {
  const { participantId, proposerId, groupId, gender, eventId } = data;
  return async (dispatch, getState) => {
    const me = getState().me.myData;
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/participants/remove`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            proposerId: proposerId,
            participantId: participantId,
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
      await changeEventData();
      await dispatch(fetchEventDetail(eventId));
      await dispatch(fetchMyEvents(me._id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createANewEvent = data => {
  const {
    activity,
    allowedGender,
    allowedParticipants,
    visibility,
    allowInvitations,
    allowReplacementsType,
    when,
    description,
    externalLink,
    group,
    skill,
    maxParticipants,
    organizer,
    sport,
    title,
  } = data;
  return async (dispatch, getState) => {
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const createEventData = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/events/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          sport: sport,
          group: group,
          organizer: organizer,
          maxParticipants: maxParticipants,
          allowInvitations: allowInvitations,
          allowReplacementsType: allowReplacementsType,
          externalLink: externalLink,
          when: when,
          skill: skill,
          visibility: visibility,
          allowedGender: allowedGender,
          allowedParticipants: allowedParticipants,
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
      await createEventData();
      await dispatch(getGroupEvents(group));
      await dispatch(fetchMyEvents(organizer));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateEventTimeDate = data => {
  const { groupId, eventId, when } = data;

  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    // ********************************************************
    // Function to fetch the event
    // ********************************************************
    const changeEventData = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/events/${eventId}/when/change`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: adminId,
            groupId: groupId,
            when: when,
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
      const newDateResponse = await changeEventData();
      await dispatch(
        eventActions.updateDateTime({ when: newDateResponse.when })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
