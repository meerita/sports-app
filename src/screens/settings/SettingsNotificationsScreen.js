/** @format */

import { t } from '../../services/i18n';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import SubHeader from '../../components/SubHeader/SubHeader';
import SingleLineWithSwitch from '../../components/Lists/OneLine/SingleLineWithSwitch';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import SwitchControl from '../../components/SwitchControl/SwitchControl';

// STORE
import {
  notificationsAppUpdates,
  notificationsGotAnInvite,
  notificationsNewEvents,
  notificationsNewMember,
  notificationsNewRecordAchieved,
  notificationsPetitionToJoin,
  notificationsPublicAnnounces,
} from '../../store/actions/me';
import PlaceholderLayout from '../../components/Layouts/PlaceholderLayout/PlaceholderLayout';
import SubtitleOne from '../../components/type/SubtitleOne';
import HeadlineFive from '../../components/type/HeadlineFive';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import { Image, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function SettingsNotificationsScreen(props) {
  // constant for the notification settings of groups
  const groups = useSelector(
    state => state.me.myData.settings.notifications.groups
  );
  // constant for the notification settings general
  const general = useSelector(
    state => state.me.myData.settings.notifications.general
  );

  const [notificationPermission, setNotificationPermission] = useState(false);

  // constant for dispatch
  const dispatch = useDispatch();

  // UseStates for every switch control
  const [newEvents, setNewEvents] = useState(groups.newEvents);
  const [gotAnInvite, setGotAnInvite] = useState(groups.gotAnInvite);
  const [newMember, setNewMember] = useState(groups.newMember);
  const [petitionToJoin, setPetitionToJoin] = useState(groups.petitionToJoin);
  const [newRecordAchieved, setNewRecordAchieved] = useState(
    groups.newRecordAchieved
  );
  const [publicAnnounces, setPublicAnnounces] = useState(
    general.publicAnnounces
  );
  const [appUpdates, setAppUpdates] = useState(general.appUpdates);

  const tooglePublicAnnounces = () => {
    if (publicAnnounces === false) {
      setPublicAnnounces(true);
      dispatch(notificationsPublicAnnounces(true));
    } else {
      setPublicAnnounces(false);
      dispatch(notificationsPublicAnnounces(false));
    }
  };

  const toogleAppUpdates = () => {
    if (appUpdates === false) {
      setAppUpdates(true);
      dispatch(notificationsAppUpdates(true));
    } else {
      setAppUpdates(false);
      dispatch(notificationsAppUpdates(false));
    }
  };

  const toogleNewEvents = () => {
    if (newEvents === false) {
      setNewEvents(true);
      dispatch(notificationsNewEvents(true));
    } else {
      setNewEvents(false);
      dispatch(notificationsNewEvents(false));
    }
  };

  const toogleGotAnInvite = () => {
    if (gotAnInvite === false) {
      setGotAnInvite(true);
      dispatch(notificationsGotAnInvite(true));
    } else {
      setGotAnInvite(false);
      dispatch(notificationsGotAnInvite(false));
    }
  };

  const toogleNewRecordAchieved = () => {
    if (newRecordAchieved === false) {
      setNewRecordAchieved(true);
      dispatch(notificationsNewRecordAchieved(true));
    } else {
      setNewRecordAchieved(false);
      dispatch(notificationsNewRecordAchieved(false));
    }
  };

  const tooglePetitionToJoin = () => {
    if (petitionToJoin === false) {
      setPetitionToJoin(true);
      dispatch(notificationsPetitionToJoin(true));
    } else {
      setPetitionToJoin(false);
      dispatch(notificationsPetitionToJoin(false));
    }
  };

  const toogleNewMember = () => {
    if (newMember === false) {
      setNewMember(true);
      dispatch(notificationsNewMember(true));
    } else {
      setNewMember(false);
      dispatch(notificationsNewMember(false));
    }
  };

  if (!notificationPermission) {
    return (
      <PlaceholderLayout>
        <Image
          source={require('../../assets/images/placeholders/notifications_placeholder.png')}
          width={96}
          height={96}
          style={{
            tintColor: Colors.light.OnBackgroundUnfocused,
            marginBottom: 16,
          }}
        />
        <HeadlineFive style={{ textAlign: 'center', paddingHorizontal: 16 }}>
          Notifications will help you to stay on track of your sports life.
        </HeadlineFive>
        <View style={{ paddingVertical: 32 }}>
          <ButtonFilled
            style={{ flexGrow: 0 }}
            onPress={() => setNotificationPermission(true)}
          >
            Activate notifications
          </ButtonFilled>
        </View>
      </PlaceholderLayout>
    );
  }

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      <SubHeader title={t('common:groups')} />
      <SingleLineWithSwitch title={t('settings:notifications.newEvents')}>
        <SwitchControl value={newEvents} onChange={toogleNewEvents} />
      </SingleLineWithSwitch>
      <SingleLineWithSwitch title={t('settings:notifications.invitesYou')}>
        <SwitchControl value={gotAnInvite} onChange={toogleGotAnInvite} />
      </SingleLineWithSwitch>
      <SingleLineWithSwitch title={t('settings:notifications.newMember')}>
        <SwitchControl value={newMember} onChange={toogleNewMember} />
      </SingleLineWithSwitch>
      <SingleLineWithSwitch title={t('settings:notifications.joinRequests')}>
        <SwitchControl value={petitionToJoin} onChange={tooglePetitionToJoin} />
      </SingleLineWithSwitch>
      <SingleLineWithSwitch title={t('settings:notifications.newRecord')}>
        <SwitchControl
          value={newRecordAchieved}
          onChange={toogleNewRecordAchieved}
        />
      </SingleLineWithSwitch>
      <SubHeader title={t('common:general')} />
      <SingleLineWithSwitch title={t('settings:notifications.announcements')}>
        <SwitchControl
          value={publicAnnounces}
          onChange={tooglePublicAnnounces}
        />
      </SingleLineWithSwitch>
      <SingleLineWithSwitch title={t('settings:notifications.appUpdates')}>
        <SwitchControl value={appUpdates} onChange={toogleAppUpdates} />
      </SingleLineWithSwitch>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:notifications.notifications'),
    presentation: 'modal',
  };
};
