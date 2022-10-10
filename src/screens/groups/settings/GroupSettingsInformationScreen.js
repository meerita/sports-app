/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../services/i18n';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import TwoLineWithIcon from '../../../components/Lists/TwoLines/TwoLineWithIcon';

export default function GroupSettingsInformationScreen(props) {
  return (
    <ScrollViewLayout>
      <TwoLineWithIcon
        icon={require('../../../assets/images/icons/info.png')}
        title={t('groups:settings.information.groupData')}
        subtitle={t('groups:settings.information.groupDataDesc')}
        onPress={() => {
          props.navigation.navigate('GroupSettingsInformationFormScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../../assets/images/icons/travel_explore.png')}
        title={t('groups:settings.information.localization')}
        subtitle={t('groups:settings.information.localizationDesc')}
        onPress={() => {
          props.navigation.navigate('GroupSettingsInformationFormScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../../assets/images/icons/photo.png')}
        title={t('groups:settings.information.image')}
        subtitle={t('groups:settings.information.imageDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsProfileScreen');
        }}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:settings.information.information'),
  };
};
