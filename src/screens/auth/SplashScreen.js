/** @format */

import { View, Text, Button, SafeAreaView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';
import React from 'react';

// COMPONENTS
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import ButtonText from '../../components/Buttons/ButtonText/ButtonText';
import Caption from '../../components/type/Caption';

// STORE
import { authActions } from '../../store/slices/auth';

// CONSTANTS
import Colors from '../../constants/Colors';
import App from '../../constants/App';

export default function SplashScreen(props) {
  // global state
  const general = useSelector(state => state.general);

  // current year for the ©
  const currentYear = new Date().getFullYear();

  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(authActions.authenticate());
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.light.surface }}>
      <View
        style={{
          backgroundColor: Colors.light.surface,
          padding: 16,
          height: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingBottom: 16,
          }}
        >
          <ButtonFilled
            style={{
              width: Dimensions.get('window').width / 2 - 20,
              marginRight: 8,
            }}
            onPress={() => props.navigation.navigate('AcceptTermsScreen')}
          >
            {t('auth:register')}
          </ButtonFilled>
          <ButtonText
            // onPress={() => props.navigation.navigate('Login')}
            onPress={() => dispatch(authActions.authenticate())}
            style={{
              width: Dimensions.get('window').width / 2 - 20,
            }}
          >
            {t('auth:login')}
          </ButtonText>
        </View>
        <Caption
          style={{
            textAlign: 'center',
            color: Colors.light.OnBackgroundUnfocused,
          }}
        >
          {t('welcome:version', { version: App.version, year: currentYear })}
        </Caption>
      </View>
    </SafeAreaView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: App.name,
    headerShadowVisible: false,
  };
};
