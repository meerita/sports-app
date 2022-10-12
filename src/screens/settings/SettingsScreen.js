/** @format */

import React from 'react';
import { ScrollView } from 'react-native';
import { t } from '../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../constants/Colors';

// COMPONENTS
import TwoLineWithIcon from '../../components/Lists/TwoLines/TwoLineWithIcon';
import Styles from '../../constants/Styles';

// STORE
import { authActions } from '../../store/slices/auth';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

export default function SettingsScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  const me = useSelector(state => state.me.myData);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/manage_accounts.png')}
        title={t('settings:account.account')}
        subtitle={t('settings:account.accountDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsAccountScreen');
        }}
      />
      <TwoLineWithIcon
        icon={
          me === null
            ? require('../../assets/images/icons/el.png')
            : me.characteristics.gender === 'male'
            ? require('../../assets/images/icons/el.png')
            : me.characteristics.gender === 'female'
            ? require('../../assets/images/icons/ella.png')
            : require('../../assets/images/icons/question_mark.png')
        }
        title={t('settings:profile.profile')}
        subtitle={t('settings:profile.profileDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsProfileScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/preferences.png')}
        title={t('settings:preferences.preferences')}
        subtitle={t('settings:preferences.preferencesDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsPreferencesScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/visibility_off.png')}
        title={t('settings:privacy.privacy')}
        subtitle={t('settings:privacy.privacyDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsPrivacyScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/PRO.png')}
        title={t('settings:subscription.subscription')}
        subtitle={t('settings:subscription.subscriptionDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsSubscriptionScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/Notifications.png')}
        title={t('settings:notifications.notifications')}
        subtitle={t('settings:notifications.notificationsDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsNotificationsScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/send.png')}
        title={t('settings:feedback.feedback')}
        subtitle={t('settings:feedback.feedbackDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsFeedbackScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/logout.png')}
        title={t('settings:logout')}
        subtitle={t('settings:logoutDesc')}
        onPress={() => logoutHandler()}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:settings'),
    headerBackTitle: t('common:back'),
    presentation: 'modal',
  };
};
