/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// PANTALLAS
import LoadingScreen from '../screens/LoadingScreen';
import MaintenanceScreen from '../screens/auth/MaintenanceScreen';

// NAVIGATORS
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// STORE
import { fetchGlobalVariables } from '../store/actions/general';
import { fetchMyUser } from '../store/actions/me';
import { authActions } from '../store/slices/auth';
import { forceTheUserLogout } from '../store/actions/auth';

export default function AppNavigator() {
  const dispatch = useDispatch();

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const tryLogin = async () => {
      // we set the initializing to true to trigger the loading screen
      setInitializing(true);
      // we get the userData from the storage
      const userData = await AsyncStorage.getItem('userData');
      // if we dont have userData we logout
      if (!userData) {
        dispatch(forceTheUserLogout());
        setInitializing(false);
        return;
      }
      // converting userData to JSON
      const transformedData = JSON.parse(userData);

      // we will extract transformedData
      const { token, userId, expiresIn } = transformedData;

      // we will convert the expiresIn to a date object for comparison
      const expirationDate = new Date(expiresIn);

      // if the expirationDate is less than the current date the token is
      // invalid and we will force a logout. Also if we dont have a token
      // and we dont have a userId we will force a logout
      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(forceTheUserLogout());
        setInitializing(false);
        return;
      }
      // we will authenticate the user
      dispatch(
        authActions.authenticate({
          userId: userId,
          token: token,
        })
      );
      // we fetch the user once we logged in
      dispatch(fetchMyUser(userId));
    };
    tryLogin();
  }, []);

  const isAuth = useSelector(state => state.auth);

  const me = useSelector(state => state.me.myData);

  const maintenance = useSelector(state => state.general.maintenance);

  // we will ask for globalvariables in this point
  useEffect(() => {
    dispatch(fetchGlobalVariables());
  }, [dispatch]);

  if (maintenance) {
    return <MaintenanceScreen />;
  }

  // we load the app
  if (!initializing) {
    return <LoadingScreen />;
  }

  // in case we need to auth
  // we load the app
  if (!isAuth.isAuthenticated) {
    return <AuthNavigator />;
  }

  // the app itself
  if (me) {
    return <MainNavigator />;
  }
}
