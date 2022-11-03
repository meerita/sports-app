/** @format */
import { meActions } from '../slices/me';
import { themeActions } from '../slices/theme';

const API_URL = 'http://192.168.1.73:9000';

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

export const fetchMyEvents = userId => {
  return async dispatch => {
    // ********************************************************
    // Function to fetch the loged in user
    // ********************************************************
    const fetchData = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/users/${userId}/events`);
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
      const responseData = await fetchData();
      console.log(responseData);
      dispatch(meActions.addMyEvents({ events: responseData }));
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

// ********************************************************
// Function to change the DIMENSIONS on the USER PREFERENCES
// ********************************************************

export const changeDimensions = dimension => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the HEIGHT of the USER
    // ********************************************************
    const changeDimension = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/preferences/dimensions`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dimensions: dimension,
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
      const dimensionsUserData = await changeDimension();
      dispatch(
        meActions.changeMyDimensionsPreferences({ dimensions: dimension })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the WEIGHTS on the USER PREFERENCES
// ********************************************************

export const changeWeights = weight => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the HEIGHT of the USER
    // ********************************************************
    const changeWeight = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/preferences/weight`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            weights: weight,
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
      const weightsUserData = await changeWeight();
      dispatch(meActions.changeMyWeightsPreferences({ weights: weight }));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the SEX of the USER
// ********************************************************

export const changeMySex = gender => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the VISIBILITY of the USER
    // ********************************************************
    const changeSex = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/users/${userId}/gender`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gender: gender,
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
      const genderUserData = await changeSex();
      dispatch(meActions.changeMySexPreferences({ gender: gender }));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the USERNAME of the USER
// ********************************************************

export const changeMyUsername = username => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the USERNAME of the USER
    // ********************************************************
    const changeUsername = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/users/${userId}/username`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
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
      const usernameData = await changeUsername();
      dispatch(meActions.changeMyUsername({ username: username }));
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the DESCRIPTION of the USER
// ********************************************************
export const changeMyDescription = description => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the DESCRIPTION of the USER
    // ********************************************************
    const changeDescription = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/description`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: description,
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
      const userDescriptionData = await changeDescription();
      dispatch(
        meActions.changeMyDescription({
          description: userDescriptionData.description,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the DESCRIPTION of the USER
// ********************************************************
export const changeMyTag = tag => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the DESCRIPTION of the USER
    // ********************************************************
    const changeTag = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/users/${userId}/tag`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag: tag,
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
      const userTagData = await changeTag();
      dispatch(
        meActions.changeMyTag({
          tag: userTagData.tag,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the ANALYTICS of the USER
// ********************************************************
export const allowAnalyticsCookies = analytics => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the ANALYTICS COOKIES of the USER
    // ********************************************************
    const changeAnalyticsCookies = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/cookies/analytics`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            analytics: analytics,
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

    try {
      const analyticsCookiesData = await changeAnalyticsCookies();
      dispatch(
        meActions.allowAnalytics({ analytics: analyticsCookiesData.analytics })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to change the ANALYTICS of the USER
// ********************************************************
export const allowMarketingCookies = marketing => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Call to change the MARKETING COOKIES of the USER
    // ********************************************************
    const changeMarketingCookies = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/cookies/marketing`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            marketing: marketing,
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

    try {
      const marketingCookiesData = await changeMarketingCookies();
      dispatch(
        meActions.allowMarketing({ marketing: marketingCookiesData.marketing })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to HIDE the USERS' GROUPS from his profile
// ********************************************************
export const hideUserGroups = hideStatus => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide user groups function
    // ********************************************************
    const hideGroups = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/privacy/general/groups`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hideMyGroups: hideStatus,
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

    try {
      const hideMyGroupsData = await hideGroups();
      dispatch(
        meActions.hideMyGroups({ hideMyGroups: hideMyGroupsData.hideMyGroups })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to HIDE the USER FROM SEARCHS
// ********************************************************
export const hideMeFromSearchResults = hideStatus => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide from search function
    // ********************************************************
    const hideSearchResults = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/privacy/general/search`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hiddenInSearch: hideStatus,
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

    try {
      const hiddenInSearchData = await hideSearchResults();
      dispatch(
        meActions.hiddenInSearch({
          hiddenInSearch: hiddenInSearchData.hiddenInSearch,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to MAKE USER INVISIBLE
// ********************************************************
export const makeMeInvisible = invisible => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const makeInvisible = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/privacy/pro/invisibility`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invisible: invisible,
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

    try {
      const invisibleData = await makeInvisible();
      dispatch(
        meActions.invisibility({
          invisible: invisibleData.invisible,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to MAKE USER INVISIBLE
// ********************************************************
export const hideUserActivity = hideStatus => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const hideActivity = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/privacy/pro/activity`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hideActivity: hideStatus,
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

    try {
      const hideActivityData = await hideActivity();
      dispatch(
        meActions.hideActivity({
          hideActivity: hideActivityData.hideActivity,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to NOTIFICATONS ON/OFF NEW EVENTS
// ********************************************************
export const notificationsNewEvents = notification => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const switchNotification = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/settings/notifications/groups/newevents`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newEvents: notification,
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

    try {
      const notificationData = await switchNotification();
      dispatch(
        meActions.notificationsNewEvents({
          newEvents: notificationData.newEvents,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to NOTIFICATONS ON/OFF NEW EVENTS
// ********************************************************
export const notificationsGotAnInvite = notification => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const switchNotification = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/settings/notifications/groups/invites`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gotAnInvite: notification,
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

    try {
      const notificationData = await switchNotification();
      dispatch(
        meActions.notificationsGotAnInvite({
          gotAnInvite: notificationData.gotAnInvite,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to NOTIFICATONS ON/OFF NEW MEMBER JOINED
// ********************************************************
export const notificationsNewMember = notification => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const switchNotification = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/settings/notifications/groups/newmember`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newMember: notification,
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

    try {
      const notificationData = await switchNotification();
      dispatch(
        meActions.notificationsNewMember({
          newMember: notificationData.newMember,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to NOTIFICATONS ON/OFF PETITIONS
// ********************************************************
export const notificationsPetitionToJoin = notification => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const switchNotification = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/settings/notifications/groups/petitiontojoin`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            petitionToJoin: notification,
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

    try {
      const notificationData = await switchNotification();
      dispatch(
        meActions.notificationsPetitionToJoin({
          petitionToJoin: notificationData.petitionToJoin,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to NOTIFICATONS ON/OFF NEW RECORD
// ********************************************************
export const notificationsNewRecordAchieved = notification => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const switchNotification = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/settings/notifications/groups/newrecord`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newRecordAchieved: notification,
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

    try {
      const notificationData = await switchNotification();
      dispatch(
        meActions.notificationsNewRecordAchieved({
          newRecordAchieved: notificationData.newRecordAchieved,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to NOTIFICATONS ON/OFF PUBLIC ANNOUNCES
// ********************************************************
export const notificationsPublicAnnounces = notification => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const switchNotification = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/settings/notifications/general/publicannounces`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            publicAnnounces: notification,
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

    try {
      const notificationData = await switchNotification();
      dispatch(
        meActions.notificationsPublicAnnounces({
          publicAnnounces: notificationData.publicAnnounces,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to NOTIFICATONS ON/OFF PUBLIC ANNOUNCES
// ********************************************************
export const notificationsAppUpdates = notification => {
  return async (dispatch, getState) => {
    const userId = getState().me.myData._id;
    // ********************************************************
    // Hide function
    // ********************************************************
    const switchNotification = async () => {
      // we call the API
      const response = await fetch(
        `${API_URL}/v1/users/${userId}/settings/notifications/general/appupdates`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appUpdates: notification,
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

    try {
      const notificationData = await switchNotification();
      dispatch(
        meActions.notificationsAppUpdates({
          appUpdates: notificationData.appUpdates,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
