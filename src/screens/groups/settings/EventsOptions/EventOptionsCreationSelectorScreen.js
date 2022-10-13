/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../../services/i18n';
import Colors from '../../../../constants/Colors';
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BodyTwo from '../../../../components/type/BodyTwo';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import { useToast } from 'react-native-toast-notifications';
import { updateEventCreation } from '../../../../store/actions/group';

export default function EventOptionsCreationSelectorScreen(props) {
  // groupDetails
  const creationPreferences = useSelector(
    state => state.group.groupDetail.preferences.events.creation
  );

  const toast = useToast();

  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(
    creationPreferences === 'any-member'
      ? 0
      : creationPreferences === 'only-members'
      ? 1
      : 2
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
  ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {t('groups:settings.events.creationDesc')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(updateEventCreation(option.value)),
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
    headerTitle: t('groups:settings.events.creation'),
    presentation: 'modal',
  };
};
