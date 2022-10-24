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

// STORE
import {
  updateEventVisibility,
  updateMyGroupDiversity,
} from '../../../../store/actions/group';
import {
  changeCustomEventVisibility,
  changeEventGenderRequirement,
} from '../../../../store/actions/event';

export default function EventOptionsGenderSelectorScreen(props) {
  // we use this to use different texts and dispatch functions depending
  // if we are editing one event or the group settings events
  const eventOnEdition = props.route.params
    ? props.route.params.editEvent
    : false;
  const eventId = props.route.params ? props.route.params.eventId : false;
  const groupId = props.route.params ? props.route.params.groupId : false;

  // event visibility settings or group event visibility settings
  const genderSelector = eventOnEdition
    ? useSelector(state => state.event.eventDetail.allowedGender)
    : useSelector(
        state => state.group.groupDetail.preferences.group.membership.diversity
      );

  // we will find out which gender this user has and set it as initial state
  const currentGender =
    genderSelector === 'male' ? 0 : genderSelector === 'female' ? 1 : 2;

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(currentGender);

  // options for the radio buttons
  const OPTIONS = eventOnEdition
    ? [
        {
          label: t('groups:settings.gender.male'),
          value: 'male',
        },
        {
          label: t('groups:settings.gender.female'),
          value: 'female',
        },
        {
          label: t('groups:settings.gender.other'),
          value: 'other',
        },
      ]
    : [
        {
          label: t('settings:profile.basicInformation.male'),
          value: 'male',
        },
        {
          label: t('settings:profile.basicInformation.female'),
          value: 'female',
        },
        {
          label: t('settings:profile.basicInformation.other'),
          value: 'other',
        },
      ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {eventOnEdition
          ? 'May require only males, only females or it can be mixed. This will affect which people will be able to participate.'
          : t('settings:profile.basicInformation.genderInfo')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            eventOnEdition
              ? changeEventGenderRequirement({
                  eventId: eventId,
                  groupId: groupId,
                  gender: option.value,
                })
              : updateMyGroupDiversity(option.value)
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
      ? 'Required gender'
      : t('settings:profile.basicInformation.gender'),
    presentation: 'modal',
  };
};
