/** @format */
import { groupActions } from '../slices/group';
import { fetchMyUser } from '../actions/me';

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

// ********************************************************
// Function to change the DIVERSITY OF THE GROUP
// ********************************************************

export const updateGroupDiversity = diversity => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const diversityToReplace = diversity;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateDiversity = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/preferences/group/membership/diversity`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            diversity: diversityToReplace,
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
      const diversityData = await updateDiversity();
      dispatch(
        groupActions.updateDiversity({
          diversity: diversityData.diversity,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the NO REGISTRATION SETTINGS OF THE GROUP
// ********************************************************

export const updateMembershipNoRegistration = noRegistration => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const noRegistrationToReplace = noRegistration;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateNoRegistration = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/preferences/group/membership/noRegistration`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            noRegistration: noRegistrationToReplace,
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
      const noRegistrationData = await updateNoRegistration();
      dispatch(
        groupActions.updateRegistration({
          noRegistration: noRegistrationData.noRegistration,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the FREE TO JOIN OF THE GROUP
// ********************************************************

export const updateMembershipFreeToJoin = freeToJoin => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const freeToJoinToReplace = freeToJoin;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateFreeToJoin = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/preferences/group/membership/freetojoin`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            freeToJoin: freeToJoinToReplace,
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
      const freeToJoinData = await updateFreeToJoin();
      dispatch(
        groupActions.updateFreeToJoin({
          freeToJoin: freeToJoinData.freeToJoin,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the MEMBERS ONLY
// ********************************************************

export const updateMembershipMembersOnly = membersOnly => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const membersOnlyToReplace = membersOnly;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateMembersOnly = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/preferences/group/membership/membersonly`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            membersOnly: membersOnlyToReplace,
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
      const membersOnlyData = await updateMembersOnly();
      dispatch(
        groupActions.updateMembersOnly({
          membersOnly: membersOnlyData.membersOnly,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the GROUP PRIVATE ONLY
// ********************************************************

export const updateGroupVisibilityPrivate = privateGroup => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const privateGroupToReplace = privateGroup;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updatePrivateGroup = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/preferences/group/visibility/private`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            private: privateGroupToReplace,
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
      const privateGroupData = await updatePrivateGroup();
      dispatch(
        groupActions.updatePrivateGroup({
          private: privateGroupData.private,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the GROUP PRIVATE ONLY
// ********************************************************

export const updateGroupVisibilityVisibility = groupVisibility => {
  return async (dispatch, getState) => {
    // the current user creating this group
    const groupId = getState().group.groupDetail._id;
    const visibilityGroupToReplace = groupVisibility;

    // ********************************************************
    // Function to update the API
    // ********************************************************
    const updateGroupVisibility = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/settings/preferences/group/visibility/visibility`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            visibility: visibilityGroupToReplace,
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
      const visibilityGroupData = await updateGroupVisibility();
      dispatch(
        groupActions.updateGroupVisibility({
          visibility: visibilityGroupData.visibility,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to MAKE A PETITION TO JOIN A GROUP
// ********************************************************

export const makeAPetitionToJoin = groupId => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Function to fetch the group in user
    // ********************************************************
    const makePetition = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/join/petition`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
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
      const petitionData = await makePetition();
      dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to REGISTER A PERSON AS A NOOB
// ********************************************************

export const registerMeAsANoob = groupId => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Function to fetch the group in user
    // ********************************************************
    const makePetition = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/join/noob`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
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
      const petitionData = await makePetition();
      dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to demote an admin to member
// ********************************************************

export const demoteAdminToMember = data => {
  const userId = data.userId;
  const groupId = data.groupId;

  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    // ********************************************************
    // Function to call the API
    // ********************************************************
    const apiCall = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/admin/demote`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            adminId: adminId,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('Could not demote admin');
      }
      // if OK then we get the response
      const data = await response.json();

      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      await apiCall();
      await dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to demote a member to noob
// ********************************************************

export const demoteMemberToNoob = data => {
  const userId = data.userId;
  const groupId = data.groupId;

  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    // ********************************************************
    // Function to call the API
    // ********************************************************
    const apiCall = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/member/demote`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            adminId: adminId,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('Could not demote admin');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      await apiCall();
      await dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to promote a noob to member
// ********************************************************

export const promoteNoobToMember = data => {
  const userId = data.userId;
  const groupId = data.groupId;

  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    // ********************************************************
    // Function to call the API
    // ********************************************************
    const apiCall = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/member/accept`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('Could not demote admin');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      await apiCall();
      await dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to promote a member to member
// ********************************************************

export const promoteMemberToAdmin = data => {
  const userId = data.userId;
  const groupId = data.groupId;

  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    // ********************************************************
    // Function to call the API
    // ********************************************************
    const apiCall = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/admin/accept`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('Could not demote admin');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      await apiCall();
      await dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to promote a noob to member
// ********************************************************

export const kickUserFromGroup = data => {
  const userId = data.userId;
  const groupId = data.groupId;

  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    // ********************************************************
    // Function to call the API
    // ********************************************************
    const apiCall = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/member/kick`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            adminId: adminId,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('Could not kick the user');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      await apiCall();
      await dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to promote a noob to member
// ********************************************************

export const unbanUserFromGroup = data => {
  const userId = data.userId;
  const groupId = data.groupId;

  return async (dispatch, getState) => {
    const adminId = getState().me.myData._id;
    // ********************************************************
    // Function to call the API
    // ********************************************************
    const apiCall = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/groups/${groupId}/member/unban`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            adminId: adminId,
          }),
        }
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('Could not kick the user');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      await apiCall();
      await dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to promote a noob to member
// ********************************************************

export const leaveThisGroup = groupId => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Function to call the API
    // ********************************************************
    const apiCall = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/groups/${groupId}/leave`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
      // we check if there's an error
      if (!response.ok) {
        throw new Error('Could not kick the user');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      await apiCall();
      await dispatch(fetchMyUser(userId));
    } catch (error) {
      console.log(error);
    }
  };
};
