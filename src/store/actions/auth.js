/** @format */
import { authActions } from '../slices/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.73:9000';

// ********************************************************
// Function to save data to storage
// ********************************************************

const saveDataToStorage = (userId, token, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      userId: userId,
      token: token,
      expiresIn: expirationDate,
    })
  );
};

// ********************************************************
// Function to register an user on the platform
// ********************************************************

export const createUser = signUpData => {
  const { email, password } = signUpData;
  const { analytics, marketing, others } = signUpData.cookies;

  return async dispatch => {
    // ********************************************************
    // Function to create the user with the API
    // ********************************************************
    const createNewUser = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          analytics: analytics,
          marketing: marketing,
          others: others,
        }),
      });
      // ********************************************************
      // we check if there's an error
      // ********************************************************
      if (!response.ok) {
        const errorResData = response.json;
        // we extract the type of error from the error response
        const errorId = errorResData.code;
        // basic error message
        let errorMessage = 'Algo ha ido mal en el registro';

        if (errorId === '11000') {
          // when the email exists, error
          errorMessage = 'El email ya existe';
        } else if (errorId === 'INVALID_EMAIL') {
          // any suspiciously malformed email, error
          errorMessage = 'El email es inválido';
        } else if (errorId === 'WEAK_PASSWORD') {
          errorMessage = 'El password es muy débil';
        } else if (errorId === 'OPERATION_NOT_ALLOWED') {
          // when we disable registration
          errorMessage = 'El registro está desactivado';
        } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          // when we detected someone tried too much times to register
          errorMessage = 'Muchos intentos';
        }

        throw new Error(errorMessage);
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const userData = await createNewUser();

      dispatch(
        authActions.authenticate({
          userId: userData.localId,
          token: userData.token,
        })
      );

      // we get the expiration date to save it in storage
      const expirationDate = new Date(
        new Date().getTime() + parseInt(userData.expiresIn)
      );

      // we save the data to storage
      saveDataToStorage(userData.localId, userData.token, expirationDate);
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to login an user on the platform
// ********************************************************

export const login = loginData => {
  const { email, password } = loginData;
  return async dispatch => {
    // ********************************************************
    // Function to login the user with the API
    // ********************************************************
    const loginUser = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // ********************************************************
      // we check if there's an error
      // ********************************************************
      if (!response.ok) {
        const errorResData = await response.json();
        // we extract the type of error from the error response
        const errorId = errorResData.code;
        // basic error message
        let errorMessage = 'Algo ha ido mal en el login';
        if (errorId === 'EMAIL_NOT_FOUND') {
          // when the email exists, error
          errorMessage = 'El email no existe';
        } else if (errorId === 'INVALID_LOGIN_PASSWORD') {
          // any suspiciously malformed email, error
          errorMessage = 'El password es inválido';
        } else if (errorId === 'USER_DISABLED') {
          errorMessage = 'El usuario está desactivado';
        }
        throw new Error(errorMessage);
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };
    // Once we have the data, we will dispatch it
    try {
      // we excecute the login function
      const userData = await loginUser();

      await dispatch(
        authActions.authenticate({
          userId: userData.localId,
          token: userData.token,
        })
      );

      await dispatch(fetchMyUser(userData.localId));

      // we get the expiration date to save it in storage
      const expirationDate = new Date(
        new Date().getTime() + parseInt(userData.expiresIn)
      );

      // we save the data to storage
      saveDataToStorage(userData.localId, userData.token, expirationDate);
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to send the password to the user
// ********************************************************

export const sendPassword = email => {
  return async dispatch => {
    const sendPasswordToUser = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/auth/recoverpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        const errorResData = response.json;
        // we extract the type of error from the error response
        const errorId = errorResData.code;
        // basic error message
        let errorMessage = 'Algo ha ido mal en el registro';
        throw new Error(errorMessage);
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data
      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      await sendPasswordToUser();
    } catch (error) {
      console.log(error);
    }
  };
};

// ********************************************************
// Function to logout an user
// ********************************************************

export const forceTheUserLogout = () => {
  return dispatch => {
    // clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    dispatch(authActions.logout());
  };
};
