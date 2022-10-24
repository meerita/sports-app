/** @format */

import { ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../services/i18n';

// CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

//COMPONENTS
import TwoLineWithIcon from '../../components/Lists/TwoLines/TwoLineWithIcon';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

export default function SettingsAccountScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ScrollViewLayout
      style={{
        paddingVertical: 16,
      }}
    >
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/password.png')}
        title={t('settings:changepassword')}
        subtitle={t('settings:changepasswordDesc')}
        onPress={() => {
          props.navigation.navigate('ChangePasswordScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/restart.png')}
        title={t('settings:resetpassword')}
        subtitle={t('settings:resetpasswordDesc')}
        onPress={() => {
          props.navigation.navigate('ResetPasswordScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/mail.png')}
        title={t('settings:email')}
        subtitle={t('settings:emailDesc')}
        onPress={() => {
          props.navigation.navigate('ChangeEmailScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/delete_forever.png')}
        title={t('settings:delete')}
        subtitle={t('settings:deleteDesc')}
        onPress={() => {
          props.navigation.navigate('DeleteAccountScreen');
        }}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:account.account'),
    presentation: 'modal',
  };
};
