/** @format */
import { groupActions } from '../slices/group';

const API_URL = 'http://192.168.1.48:8000';

// ********************************************************
// Function to fetch a group detail
// ********************************************************

export const fetchCurrentGroup = id => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the group in user
    // ********************************************************
    const fetchGroup = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/groups/${id}`);
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const groupData = await fetchGroup();
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

// ********************************************************
// Function to create a group
// ********************************************************

export const createANewGroup = () => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const adminId = getState().me.myData._id;

    // We will get the current state for newGroup
    const newGroup = getState().group.createNewGroup;

    // ********************************************************
    // Function to create teh group with the API
    // ********************************************************
    const createGroup = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newGroup.title,
          description: newGroup.description,
          country: newGroup.country,
          province: 'Barcelona',
          city: newGroup.city,
          sport: newGroup.sportId,
          members: [adminId],
          admins: [adminId],
        }),
      });
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Function to subscribe this user to the group
    const subscribeUserToNewGroup = async groupId => {
      const response = await fetch(
        `${API_URL}/v1/users/${adminId}/groups/subscribe`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            groupId: groupId,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Function to add this group to the sport counter
    const addGroupToSport = async sportId => {};

    // Once we have the data, we will dispatch it
    try {
      // we will
      const newGroupData = await createGroup();
      await subscribeUserToNewGroup(newGroupData.group._id);
      // await subscribeUserToNewGroup(newGroupData.)

      // await dispatch(
      //   groupActions.fetchGroup({
      //     group: groupData.group,
      //   })
      // );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the REPLACEMENTS OPTOINS of a group
// ********************************************************

export const updateMyGroupReplacementsPreferences = replacements => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const replacementsOption = replacements;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateReplacements = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/events/replacements`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            replacements: replacementsOption,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const replacementsData = await updateReplacements();

      dispatch(
        groupActions.updateReplacements({
          replacements: replacementsData.replacements,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the REQUIRED SKILL OPTOINS of a group
// ********************************************************

export const updateEventRequiredSkill = skill => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const skillToReplace = skill;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateSkill = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/events/skills`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skill: skillToReplace,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const skillData = await updateSkill();

      dispatch(
        groupActions.updateSkill({
          skill: skillData.skill,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the VISIBILITY OF THE GROUP of a group
// ********************************************************

export const updateEventVisibility = visibility => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const visibilityToReplace = visibility;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateVisibility = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/events/visibility`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            visibility: visibilityToReplace,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const visibilityData = await updateVisibility();

      dispatch(
        groupActions.updateVisibility({
          visibility: visibilityData.visibility,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the VISIBILITY OF THE GROUP of a group
// ********************************************************

export const updateEventParticipation = participation => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const participationToReplace = participation;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateParticipation = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/events/participation`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participation: participationToReplace,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const participationData = await updateParticipation();

      dispatch(
        groupActions.updateParticipation({
          participation: participationData.participation,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the CREATION OF EVENTS OF THE GROUP
// ********************************************************

export const updateEventCreation = creation => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const creationToReplace = creation;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateCreation = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/events/creation`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creation: creationToReplace,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any group data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const creationData = await updateCreation();

      dispatch(
        groupActions.updateCreation({
          creation: creationData.creation,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
