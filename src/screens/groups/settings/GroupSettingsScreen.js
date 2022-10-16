/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../../services/i18n';

// COMPONENTS
import SingleLineWithCaption from '../../../components/Lists/OneLine/SingleLineWithCaption';
import SingleLineWithIcon from '../../../components/Lists/OneLine/SingleLineWithIcon';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import TwoLineWithIcon from '../../../components/Lists/TwoLines/TwoLineWithIcon';
import SubtitleOne from '../../../components/type/SubtitleOne';

// STORE
import {
  makeAPetitionToJoin,
  registerMeAsANoob,
} from '../../../store/actions/group';
import { useToast } from 'react-native-toast-notifications';

export default function GroupSettingsScreen(props) {
  // myData
  const me = useSelector(state => state.me.myData);

  const toast = useToast();

  const dispatch = useDispatch();

  // Constant to get all the details of the current group
  const currentGroup = useSelector(state => state.group.groupDetail);

  // the List of the admins of this group
  const groupAdmins = currentGroup.admins;
  // the list of members
  const groupMembers = currentGroup.members;
  const groupNoobs = currentGroup.noobs;

  // the invitation list of users
  const invitationList = currentGroup.invitations;

  // we need to know if this group allows registration
  const noRegistration =
    currentGroup.preferences.group.membership.noRegistration;

  // We need to know if the visitor is a member of the group
  const amIAnAdmin = groupAdmins.find(member => member._id === me._id)
    ? true
    : false;

  // We need to know if the visitor is a member of the group
  const isItMyGroup = groupMembers.find(member => member._id === me._id)
    ? true
    : groupNoobs.find(member => member._id === me._id)
    ? true
    : false;

  const alreadyPetitionedAccess = invitationList.find(
    member => member._id === me._id
  )
    ? true
    : false;

  const sendPetitionToJoin = () => {
    try {
      dispatch(makeAPetitionToJoin(currentGroup._id));
      // console.log(currentGroup._id);
    } catch (error) {
      console.log(error);
    }
  };

  const registerThisUserAsANoob = () => {
    try {
      dispatch(registerMeAsANoob(currentGroup._id));
    } catch (error) {
      console.log(error);
    }
  };

  const amIbanned = currentGroup.banned.includes(me._id);

  if (amIbanned) {
    return (
      <View>
        <Text>Estás banneado de este grupo</Text>
      </View>
    );
  }

  if (!isItMyGroup && noRegistration) {
    return (
      <ScrollViewLayout style={{ padding: 16 }}>
        <SubtitleOne>{t('groups:settings.privacy.noRegisterDesc')}</SubtitleOne>
      </ScrollViewLayout>
    );
  }

  if (!isItMyGroup) {
    return (
      <>
        {currentGroup.preferences.group.membership.freeToJoin ? (
          <ScrollViewLayout style={{ paddingVertical: 16 }}>
            <TwoLineWithIcon
              icon={require('../../../assets/images/icons/login.png')}
              title={t('groups:joinGroup', { group: currentGroup.title })}
              subtitle={t('groups:joinGroupDesc')}
              onPress={() => registerThisUserAsANoob()}
            />
          </ScrollViewLayout>
        ) : alreadyPetitionedAccess === false ? (
          <ScrollViewLayout style={{ paddingVertical: 16 }}>
            <TwoLineWithIcon
              icon={require('../../../assets/images/icons/suspense.png')}
              title={t('groups:petitionToJoin')}
              subtitle={t('groups:petitionToJoinDesc')}
              onPress={() => sendPetitionToJoin()}
            />
          </ScrollViewLayout>
        ) : (
          <ScrollViewLayout style={{ padding: 16 }}>
            <SubtitleOne>
              You already have made a petition to enter this group. Just wait
              the admins approve your registration.
            </SubtitleOne>
          </ScrollViewLayout>
        )}
      </>
    );
  }

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
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
    headerTitle: t('groups:groupSettings'),
    presentation: 'modal',
  };
};
