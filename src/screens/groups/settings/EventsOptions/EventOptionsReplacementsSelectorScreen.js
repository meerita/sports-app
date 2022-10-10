/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../../services/i18n';
import Colors from '../../../../constants/Colors';
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BodyTwo from '../../../../components/type/BodyTwo';
import TwoLineWithRadio from '../../../../components/Lists/TwoLines/TwoLineWithRadio';

export default function EventOptionsReplacementsSelectorScreen(props) {
  // groupDetails
  const eventPreferences = useSelector(
    state => state.group.groupDetail.preferences.events
  );

  // what radiobutton is checked first
  const [selected, setSelected] = useState(
    eventPreferences.visbility === 'only-my-group' ? 1 : 0
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
    <View
      style={{
        paddingVertical: 16,
        backgroundColor: Colors.light.surface,
        flex: 1,
      }}
    >
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {t('groups:settings.events.replacementsDesc')}
      </BodyTwo>
      <TwoLineWithRadio
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
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:settings.events.replacements'),
  };
};
