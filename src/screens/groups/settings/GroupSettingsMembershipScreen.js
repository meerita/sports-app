/** @format */

import { View, Text, Switch } from 'react-native';
import React from 'react';
import { t } from '../../../services/i18n';
import SubHeader from '../../../components/SubHeader/SubHeader';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../components/type/BodyTwo';
import { useSelector } from 'react-redux';
import TwoLineItemWithSwitch from '../../../components/Lists/TwoLines/TwoLineItemWithSwitch';
import Styles from '../../../constants/Styles';
import SingleLineWithRadio from '../../../components/Lists/OneLine/SingleLineWithRadio';

import { useState } from 'react';
import Toast from 'react-native-toast-notifications';

export default function GroupSettingsMembershipScreen(props) {
  const membership = useSelector(
    state => state.group.groupDetail.preferences.group.membership
  );
  const noRegistration = membership.noRegistration;
  const freeToJoin = membership.freeToJoin;
  const membersOnly = membership.membersOnly;

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

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        Aquí puedes controlar todos los ajustes de membrecía del grupo.
      </BodyTwo>
      <TwoLineItemWithSwitch
        title={t('groups:settings.privacy.noRegister')}
        subtitle={t('groups:settings.privacy.noRegisterDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={noRegistration}
          // onChange={onChange}
          // onBlur={onBlur}
          // onValueChange={toogleVisibility}
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
          // onChange={onChange}
          // onBlur={onBlur}
          // onValueChange={toogleVisibility}
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
          // onChange={onChange}
          // onBlur={onBlur}
          // onValueChange={toogleVisibility}
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
          // dispatch(
          //   meActions.changeGender(auth.userId, auth.token, option.value)
          // ),
          setSelected(index),
          Toast.show(t('common:infoUpdated')),
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
