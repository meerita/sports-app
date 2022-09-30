/** @format */

import { ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../services/i18n';

// CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

//COMPONENTS
import SingleLineWithIcon from '../../components/Lists/OneLine/SingleLineWithIcon';

export default function SettingsPreferencesScreen(props) {
  // darkMode ?
  const darkMode = useSelector(state => state.theme.darkMode);
  // user preferences
  const preferences = useSelector(
    state => state.me.myData.settings.preferences
  );
  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      }}
    >
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/straighten.png')}
        title={t('settings:preferences.metricSystem')}
        caption={
          preferences.dimensions === 'imperial'
            ? t('common:height.imperial.description')
            : t('common:height.metric.description')
        }
        onPress={() => props.navigation.navigate('PreferencesDimensionsScreen')}
      />
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/weight.png')}
        title={t('settings:preferences.unitSystem')}
        caption={
          preferences.weights === 'imperial'
            ? t('common:weight.imperial.description')
            : t('common:weight.metric.description')
        }
        onPress={() => props.navigation.navigate('PreferencesWeightScreen')}
      />
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/translate.png')}
        title={t('settings:preferences.language')}
        caption='Español'
      />
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/dark_mode.png')}
        title={t('settings:preferences.theme')}
        caption={
          darkMode
            ? t('settings:preferences.themeDark')
            : t('settings:preferences.themeLight')
        }
        onPress={() => props.navigation.navigate('PreferencesThemeScreen')}
      />
    </ScrollView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:preferences.preferences'),
    presentation: 'modal',
  };
};
