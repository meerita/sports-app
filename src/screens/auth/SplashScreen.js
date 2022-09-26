/** @format */

import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

// STORE
import { authActions } from '../../store/slices/auth';

export default function SplashScreen(props) {
  const general = useSelector(state => state.general);

  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(authActions.authenticate());
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ padding: 16 }}>
        {general.register ? (
          <Button
            title='Register'
            onPress={() => props.navigation.navigate('AcceptTermsScreen')}
          />
        ) : (
          <Text>No hay registro disponible.</Text>
        )}
        {general.login ? (
          <Button title='Login' onPress={() => loginHandler()} />
        ) : (
          <Text>No hay login</Text>
        )}
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
