/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../../services/i18n';
import Colors from '../../../../constants/Colors';
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TwoLineWithRadio from '../../../../components/Lists/TwoLines/TwoLineWithRadio';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../../components/type/BodyTwo';
import { useToast } from 'react-native-toast-notifications';
import { updateEventRequiredSkill } from '../../../../store/actions/group';
import {
  changeEventGenderRequirement,
  changeEventSkillRequirement,
} from '../../../../store/actions/event';

export default function EventOptionsSkillsSelectorScreen(props) {
  const eventOnEdition = props.route.params
    ? props.route.params.editEvent
    : false;
  const eventId = props.route.params ? props.route.params.eventId : false;
  const groupId = props.route.params ? props.route.params.groupId : false;

  const eventSkillPreferences = eventOnEdition
    ? useSelector(state => state.event.eventDetail.skill)
    : useSelector(state => state.group.groupDetail.preferences.events.skill);

  const toast = useToast();

  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(
    eventSkillPreferences === 'novice'
      ? 0
      : eventSkillPreferences === 'advanced-beginner'
      ? 1
      : eventSkillPreferences === 'competent'
      ? 2
      : eventSkillPreferences === 'proficient'
      ? 3
      : 4
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
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {eventOnEdition
          ? 'You are about to change the minimum skill required to participate in this event.'
          : t('skills:groupDesc')}
      </BodyTwo>
      <TwoLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            eventOnEdition
              ? changeEventSkillRequirement({
                  eventId: eventId,
                  groupId: groupId,
                  skill: option.value,
                })
              : updateEventRequiredSkill(option.value)
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
  const editingEvent = navData.route.params
    ? navData.route.params.editEvent
    : false;

  return {
    headerTitle: editingEvent
      ? 'Habilidad mínima requerida'
      : t('groups:settings.events.skill'),
    presentation: 'modal',
  };
};
