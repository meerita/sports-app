/** @format */

import { ScrollView } from 'react-native';
import { t } from '../../services/i18n';
import React from 'react';

// CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

// COMPONENTS
import SubHeader from '../../components/SubHeader/SubHeader';
import SingleLineWithSwitch from '../../components/Lists/OneLine/SingleLineWithSwitch';
import { useSelector } from 'react-redux';

export default function SettingsNotificationsScreen(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      }}
    >
      <SubHeader title={t('common:groups')} />
      <SingleLineWithSwitch title={t('settings:notifications.newEvents')} />
      <SingleLineWithSwitch title={t('settings:notifications.invitesYou')} />
      <SingleLineWithSwitch title={t('settings:notifications.newMember')} />
      <SingleLineWithSwitch title={t('settings:notifications.joinRequests')} />
      <SingleLineWithSwitch title={t('settings:notifications.newRecord')} />
      <SubHeader title={t('common:general')} />
      <SingleLineWithSwitch title={t('settings:notifications.announcements')} />
      <SingleLineWithSwitch title={t('settings:notifications.appUpdates')} />
    </ScrollView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:notifications.notifications'),
    presentation: 'modal',
  };
};
