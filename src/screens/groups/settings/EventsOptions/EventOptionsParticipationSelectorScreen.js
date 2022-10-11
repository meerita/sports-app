/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../../services/i18n';
import Colors from '../../../../constants/Colors';
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

export default function EventOptionsParticipationSelectorScreen(props) {
  // groupDetails
  const eventPreferences = useSelector(
    state => state.group.groupDetail.preferences.events
  );

  // what radiobutton is checked first
  const [selected, setSelected] = useState(
    eventPreferences.participation === 'any-member'
      ? 0
      : eventPreferences.participation === 'only-members'
      ? 1
      : eventPreferences.participation === 'only-admins'
      ? 2
      : 3
  );

  // The current options for creating the radio button options
  const OPTIONS = [
    {
      label: t('groups:settings.events.types.any-member'),
      value: 'any-member',
    },
    {
      label: t('groups:settings.events.types.only-members'),
      value: 'only-members',
    },
    {
      label: t('groups:settings.events.types.only-admins'),
      value: 'only-admins',
    },
    {
      label: t('groups:settings.events.types.anyone'),
      value: 'anyone',
    },
  ];

  return (
    <ScrollViewLayout>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            meActions.changeWeightSystem(auth.userId, auth.token, option.value)
          ),
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
    headerTitle: t('groups:settings.events.participation'),
  };
};
