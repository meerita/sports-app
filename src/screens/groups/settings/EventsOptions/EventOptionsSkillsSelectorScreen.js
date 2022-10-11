/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../../services/i18n';
import Colors from '../../../../constants/Colors';
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TwoLineWithRadio from '../../../../components/Lists/TwoLines/TwoLineWithRadio';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../../components/type/BodyTwo';

export default function EventOptionsSkillsSelectorScreen(props) {
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
      label: t('skills:novice.title'),
      description: t('skills:novice.description'),
      value: 'novice',
    },
    {
      label: t('skills:advanced-beginner.title'),
      description: t('skills:advanced-beginner.description'),
      value: 'advanced-beginner',
    },
    {
      label: t('skills:competent.title'),
      description: t('skills:competent.description'),
      value: 'competent',
    },
    {
      label: t('skills:proficient.title'),
      description: t('skills:proficient.description'),
      value: 'proficient',
    },
    {
      label: t('skills:expert.title'),
      description: t('skills:expert.description'),
      value: 'expert',
    },
  ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {t('skills:groupDesc')}
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
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:settings.events.skill'),
  };
};
