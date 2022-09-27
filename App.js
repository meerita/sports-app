/** @format */

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { I18nManager as RNI18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { ToastProvider } from 'react-native-toast-notifications';

// STORE
import store from './src/store/index';

// NAVIGATORS
import AppNavigator from './src/navigators/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';

// SERVICES
import i18n from './src/services/i18n';
import { useState } from 'react';

export default function App() {
  // loading fonts
  let [fontsLoaded] = useFonts({
    'Barlow-Light': require('./src/assets/fonts/Barlow-Light.ttf'),
    'Barlow-Regular': require('./src/assets/fonts/Barlow-Regular.ttf'),
    'Barlow-Medium': require('./src/assets/fonts/Barlow-Medium.ttf'),
    'Barlow-SemiBold': require('./src/assets/fonts/Barlow-SemiBold.ttf'),
  });

  // language laoding
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  i18n
    .init()
    .then(() => {
      const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';
      // RN doesn't always correctly identify native
      // locale direction, so we force it here.
      if (i18n.dir !== RNDir) {
        const isLocaleRTL = i18n.dir === 'RTL';
        RNI18nManager.forceRTL(isLocaleRTL);
        // RN won't set the layout direction if we
        // don't restart the app's JavaScript.
        Updates.reloadFromCache();
      }
      setIsI18nInitialized(true);
    })
    .catch(error => console.warn(error));

  if (!fontsLoaded) {
    return <LoadingScreen />;
  } else {
    return (
      <Provider store={store}>
        <ToastProvider
          textStyle={{ fontFamily: 'Barlow-SemiBold', fontSize: 16 }}
          offsetBottom={20}
        >
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ToastProvider>
      </Provider>
    );
  }
}
