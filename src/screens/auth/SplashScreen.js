/** @format */

import { View, Text, Button, Appearance, useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import { authenticate } from '../../store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyUser } from '../../store/actions/me';
import { authActions } from '../../store/slices/auth';

export default function SplashScreen(props) {
  const isAuth = useSelector(state => state.auth);
  const me = useSelector(state => state.me.myData);
  const myGroups = useSelector(state => state.me.myGroups);
  const general = useSelector(state => state.general);

  const dispatch = useDispatch();

  const userId = '62385d8caee17d13a1762b39';

  console.log(Appearance.getColorScheme());

  console.log(general);

  useEffect(() => {
    dispatch(fetchMyUser(userId));
  }, []);

  const loginHandler = () => {
    dispatch(authActions.authenticate());
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is an app</Text>
      <View style={{ padding: 16 }}>
        <Button
          title='Register'
          onPress={() => props.navigation.navigate('RegisterScreen')}
        />
        <Text> </Text>
        <Button title='Login' onPress={() => loginHandler()} />
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Minide',
  };
};
