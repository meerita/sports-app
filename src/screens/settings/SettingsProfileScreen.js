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

export default function SettingsProfileScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  const me = useSelector(state => state.me.myData);
  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      }}
    >
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
        title={t('settings:profile.basicInformation.basicInformation')}
        subtitle={t('settings:profile.basicInformation.basicInformationDesc')}
        onPress={() => {
          props.navigation.navigate('BasicInformationScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/switch_account.png')}
        title={t('settings:profileManager.profileManager')}
        subtitle={t('settings:profileManager.profileManagerDesc')}
        onPress={() => {
          props.navigation.navigate('SettingsPrivacyScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../assets/images/icons/group_add.png')}
        title={t('settings:groupMembership.groupMembership')}
        subtitle={t('settings:groupMembership.groupMembershipDesc')}
        onPress={() => {
          props.navigation.navigate('MyGroupsScreen');
        }}
      />
    </ScrollView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:profile.profile'),
    presentation: 'modal',
  };
};
