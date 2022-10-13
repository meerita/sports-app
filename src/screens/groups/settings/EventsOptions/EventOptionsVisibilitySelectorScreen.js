/** @format */
import React from 'react';
import { t } from '../../../../services/i18n';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

// CONSTANTS
import Colors from '../../../../constants/Colors';

// COMPONENTS
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../../components/type/BodyTwo';
import { updateEventVisibility } from '../../../../store/actions/group';

export default function EventOptionsVisibilitySelectorScreen(props) {
  // groupDetails
  const eventVisibility = useSelector(
    state => state.group.groupDetail.preferences.events.visibility
  );

  const toast = useToast();

  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(
    eventVisibility === 'only-my-group' ? 0 : 1
  );

  // The current options for creating the radio button options
  const OPTIONS = [
    {
      label: t('groups:settings.events.types.only-my-group'),
      value: 'only-my-group',
    },
    {
      label: t('groups:settings.events.types.anyone'),
      value: 'anyone',
    },
  ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {t('groups:settings.events.visibilityDesc')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(updateEventVisibility(option.value)),
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
    headerTitle: t('groups:settings.events.visibility'),
    presentation: 'modal',
  };
};
