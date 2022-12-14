/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../../services/i18n';
import Colors from '../../../../constants/Colors';
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BodyTwo from '../../../../components/type/BodyTwo';
import TwoLineWithRadio from '../../../../components/Lists/TwoLines/TwoLineWithRadio';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

// STORE
import { updateMyGroupReplacementsPreferences } from '../../../../store/actions/group';
import { useToast } from 'react-native-toast-notifications';
import { eventActions } from '../../../../store/slices/event';

export default function EventOptionsReplacementsSelectorScreen(props) {
  const creatingEvent = props.route.params
    ? props.route.params.createEvent
    : false;

  // groupDetails
  const replacementsPreferences = creatingEvent
    ? useSelector(state => state.event.createEvent.allowReplacementsType)
    : useSelector(
        state => state.group.groupDetail.preferences.events.replacements
      );

  const toast = useToast();

  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(
    replacementsPreferences === 'no-replacements'
      ? 0
      : replacementsPreferences === 'allow-replacements'
      ? 1
      : 2
  );

  // The current options for creating the radio button options
  const OPTIONS = [
    {
      label: t('groups:settings.events.types.no-replacements.title'),
      description: t(
        'groups:settings.events.types.no-replacements.description'
      ),
      value: 'no-replacements',
    },
    {
      label: t('groups:settings.events.types.allow-replacements.title'),
      description: t(
        'groups:settings.events.types.allow-replacements.description'
      ),
      value: 'allow-replacements',
    },
    {
      label: t('groups:settings.events.types.auto-replacements.title'),
      description: t(
        'groups:settings.events.types.auto-replacements.description'
      ),
      value: 'auto-replacements',
    },
  ];

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {t('groups:settings.events.replacementsDesc')}
      </BodyTwo>
      <TwoLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          creatingEvent
            ? dispatch(
                eventActions.createEventReplacements({
                  allowReplacementsType: option.value,
                })
              )
            : dispatch(updateMyGroupReplacementsPreferences(option.value)),
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
    headerTitle: t('groups:settings.events.replacements'),
    presentation: 'modal',
  };
};
