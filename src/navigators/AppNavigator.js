/** @format */

import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// PANTALLAS
import LoadingScreen from '../screens/LoadingScreen';
import MaintenanceScreen from '../screens/auth/MaintenanceScreen';

// NAVIGATORS
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import MainBottomNavigation from './MainBottomNavigation';

// STORE
import { fetchGlobalVariables } from '../store/actions/general';
import { fetchMyUser } from '../store/actions/me';

export default function AppNavigator() {
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth);

  const maintenance = useSelector(state => state.general.maintenance);

  const userId = '63a17a5eb63c42b099b5629e'; // Minide
  // const userId = '6374c70677f45f0c0f10336e'; // Misterio
  // const userId = '63a7422243fa97c1ebe5111f'; // timcuqui
  // const userId = '6361557ceb317d919b580e69'; // roger
  // const userId = '63615337eb317d919b580e01'; // viso
  // const userId = '623b5d3d7e4216025e7210fd'; // ruven
  // const userId = '63a4159b0b67ba239d048364'; // patitas
  // const userId = '63a19d30925d45b9890e9e86'; // Lupión
  // const userId = '6361553eeb317d919b580e57'; // M4DP3Y
  // const userId = '6361556deb317d919b580e63'; // MyClaus

  const me = useSelector(state => state.me.myData);

  useEffect(() => {
    dispatch(fetchMyUser(userId));
  }, [dispatch]);

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
  return <MainNavigator />;
}
