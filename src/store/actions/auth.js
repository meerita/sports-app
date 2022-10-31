/** @format */
import { authActions } from '../slices/auth';

const API_URL = 'http://192.168.1.42:9000';

// ********************************************************
// Function to register an user on the platform
// ********************************************************

export const createUser = userId => {
  return async dispatch => {
    // ********************************************************
    // Function to create the user with the API
    // ********************************************************
    const createNewUser = async () => {
      // we call the API
      const response = await fetch(`${API_URL}/v1/auth/signup`, {
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
        const errorResData = await response.json;
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
      const userData = await createUser();
      // dispatch();
      // dispatch();
    } catch (error) {
      console.log(error);
    }
  };
};
