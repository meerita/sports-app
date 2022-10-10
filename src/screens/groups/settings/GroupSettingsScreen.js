/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../../services/i18n';

// COMPONENTS
import SingleLineWithCaption from '../../../components/Lists/OneLine/SingleLineWithCaption';
import SingleLineWithIcon from '../../../components/Lists/OneLine/SingleLineWithIcon';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import TwoLineWithIcon from '../../../components/Lists/TwoLines/TwoLineWithIcon';

export default function GroupSettingsScreen(props) {
  // myData
  const me = useSelector(state => state.me.myData);

  // Constant to get all the details of the current group
  const currentGroup = useSelector(state => state.group.groupDetail);

  // the List of the admins of this group
  const groupAdmins = currentGroup.admins;

  // We need to know if the visitor is a member of the group
  const amIAnAdmin = groupAdmins.find(member => member._id === me._id)
    ? true
    : false;

  return (
    <ScrollViewLayout>
      {amIAnAdmin ? (
        <>
          <TwoLineWithIcon
            icon={require('../../../assets/images/icons/info.png')}
            title={t('groups:settings.information.information')}
            subtitle={t('groups:settings.information.informationDesc')}
            onPress={() => {
              props.navigation.navigate('GroupSettingsInformationScreen');
            }}
          />
          <TwoLineWithIcon
            icon={require('../../../assets/images/icons/person_add.png')}
            title={t('groups:settings.members')}
            subtitle={t('groups:settings.membersDesc')}
            onPress={() => {
              props.navigation.navigate('SettingsProfileScreen');
            }}
          />
          <TwoLineWithIcon
            icon={require('../../../assets/images/icons/manage_accounts.png')}
            title={t('groups:settings.membership')}
            subtitle={t('groups:settings.membershipDesc')}
            onPress={() => {
              props.navigation.navigate('GroupSettingsMembershipScreen');
            }}
          />
          <TwoLineWithIcon
            icon={require('../../../assets/images/icons/events.png')}
            title={t('groups:settings.events.events')}
            subtitle={t('groups:settings.events.eventsDesc')}
            onPress={() => {
              props.navigation.navigate('GroupSettingsEventsScreen');
            }}
          />
          <TwoLineWithIcon
            icon={require('../../../assets/images/icons/visibility_off.png')}
            title={t('groups:settings.privacy.privacy')}
            subtitle={t('groups:settings.privacy.privacyDesc')}
            onPress={() => {
              props.navigation.navigate('GroupSettingsPrivacyScreen');
            }}
          />
        </>
      ) : (
        false
      )}
      <TwoLineWithIcon
        title='Salir del grupo'
        subtitle='Dejarás de ser miembro de este grupo'
        icon={require('../../../assets/images/icons/logout.png')}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Group Settings',
  };
};
