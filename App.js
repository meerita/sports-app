/** @format */

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

// STORE
import store from './src/store/index';

// NAVIGATORS
import AppNavigator from './src/navigators/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';

export default function App() {
  // loading fonts
  let [fontsLoaded] = useFonts({
    'Barlow-Light': require('./src/assets/fonts/Barlow-Light.ttf'),
    'Barlow-Regular': require('./src/assets/fonts/Barlow-Regular.ttf'),
    'Barlow-Medium': require('./src/assets/fonts/Barlow-Medium.ttf'),
    'Barlow-SemiBold': require('./src/assets/fonts/Barlow-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}
