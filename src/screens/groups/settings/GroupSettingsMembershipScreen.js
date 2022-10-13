/** @format */

import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import { t } from '../../../services/i18n';
import SubHeader from '../../../components/SubHeader/SubHeader';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../components/type/BodyTwo';
import { useDispatch, useSelector } from 'react-redux';
import TwoLineItemWithSwitch from '../../../components/Lists/TwoLines/TwoLineItemWithSwitch';
import Styles from '../../../constants/Styles';
import SingleLineWithRadio from '../../../components/Lists/OneLine/SingleLineWithRadio';

import { useToast } from 'react-native-toast-notifications';
import {
  updateGroupDiversity,
  updateMembershipFreeToJoin,
  updateMembershipMembersOnly,
  updateMembershipNoRegistration,
} from '../../../store/actions/group';
import { groupActions } from '../../../store/slices/group';

export default function GroupSettingsMembershipScreen(props) {
  const membership = useSelector(
    state => state.group.groupDetail.preferences.group.membership
  );

  const toast = useToast();

  const dispatch = useDispatch();

  const OPTIONS = [
    {
      label: t('groups:settings.gender.male'),
      value: 'male',
    },
    {
      label: t('groups:settings.gender.female'),
      value: 'female',
    },
    {
      label: t('groups:settings.gender.mixed'),
      value: 'mixed',
    },
  ];

  // what radiobutton is checked first
  const [selected, setSelected] = useState(currentGender);

  // we will find out which gender this user has and set it as initial state
  const currentGender =
    membership.diversity === 'male'
      ? 0
      : membership.diversity === 'female'
      ? 1
      : 2;

  const [noRegistration, setNoRegistration] = useState(
    membership.noRegistration
  );

  const [freeToJoin, setFreeToJoin] = useState(membership.freeToJoin);
  const [membersOnly, setMembersOnly] = useState(membership.membersOnly);

  const toogleNoRegistration = () => {
    if (noRegistration === false) {
      setNoRegistration(true);
      dispatch(updateMembershipNoRegistration(true));
    } else {
      setNoRegistration(false);
      dispatch(updateMembershipNoRegistration(false));
    }
  };

  const toogleFreeToJoin = () => {
    if (noRegistration === false) {
      setFreeToJoin(true);
      dispatch(updateMembershipFreeToJoin(true));
    } else {
      setFreeToJoin(false);
      dispatch(updateMembershipFreeToJoin(false));
    }
  };

  const toogleMembersOnly = () => {
    if (noRegistration === false) {
      setMembersOnly(true);
      dispatch(updateMembershipMembersOnly(true));
    } else {
      setMembersOnly(false);
      dispatch(updateMembershipMembersOnly(false));
    }
  };

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      <TwoLineItemWithSwitch
        title={t('groups:settings.privacy.noRegister')}
        subtitle={t('groups:settings.privacy.noRegisterDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={noRegistration}
          onChange={toogleNoRegistration}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('groups:settings.privacy.freeJoin')}
        subtitle={t('groups:settings.privacy.freeJoinDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={freeToJoin}
          onChange={toogleFreeToJoin}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('groups:settings.privacy.membersOnly')}
        subtitle={t('groups:settings.privacy.membersOnlyDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={membersOnly}
          onChange={toogleMembersOnly}
        />
      </TwoLineItemWithSwitch>
      <SubHeader title='Sexo de los miembros' />
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {t('settings:profile.basicInformation.genderInfo')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={currentGender}
        onChangeSelect={(option, index) => (
          dispatch(updateGroupDiversity(option.value)),
          setSelected(index),
          toast.show(t('common:infoUpdated')),
          props.navigation.goBack()
        )}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:settings.membership'),
  };
};
