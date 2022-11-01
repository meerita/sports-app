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
  changeGroupTypeOfActivity,
  updateEventVisibility,
  updateMyGroupDiversity,
} from '../../../../store/actions/group';
import {
  changeCustomEventVisibility,
  changeEventActivity,
  changeEventGenderRequirement,
  changeEventMaxParticipants,
} from '../../../../store/actions/event';
import TwoLineWithRadio from '../../../../components/Lists/TwoLines/TwoLineWithRadio';
import { eventActions } from '../../../../store/slices/event';

export default function EventOptionsTypeOfActivitySelectorScreen(props) {
  // we use this to use different texts and dispatch functions depending
  // if we are editing one event or the group settings events
  const eventOnEdition = props.route.params
    ? props.route.params.editEvent
    : false;
  // i am creating a new event
  const creatingEvent = props.route.params
    ? props.route.params.createEvent
    : false;

  const eventId = props.route.params ? props.route.params.eventId : false;
  const groupId = props.route.params ? props.route.params.groupId : false;

  // event visibility settings or group event visibility settings
  const currentGroupId = useSelector(state => state.group.groupDetail._id);

  // event visibility settings or group event visibility settings
  const currentSport = eventOnEdition
    ? useSelector(state => state.event.eventDetail.sport.title)
    : useSelector(state => state.group.groupDetail.sport.title);

  const activityPreferences = eventOnEdition
    ? useSelector(state => state.event.eventDetail.activity)
    : creatingEvent
    ? useSelector(state => state.event.createEvent.activity)
    : useSelector(state => state.group.groupDetail.preferences.events.activity);

  const currentSportSelector =
    activityPreferences === 'type_one'
      ? 0
      : activityPreferences === 'type_two'
      ? 1
      : activityPreferences === 'type_three'
      ? 2
      : 3;

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(currentSportSelector);

  // options for the radio buttons
  const OPTIONS = [
    {
      label: t(`typesOfActivity:${currentSport}.type_one.label`),
      description: t(`typesOfActivity:${currentSport}.type_one.description`),
      value: 'type_one',
      max: t(`typesOfActivity:${currentSport}.type_one.max`),
    },
    {
      label: t(`typesOfActivity:${currentSport}.type_two.label`),
      description: t(`typesOfActivity:${currentSport}.type_two.description`),
      value: 'type_two',
      max: t(`typesOfActivity:${currentSport}.type_two.max`),
    },
    {
      label: t(`typesOfActivity:${currentSport}.type_three.label`),
      description: t(`typesOfActivity:${currentSport}.type_three.description`),
      value: 'type_three',
      max: t(`typesOfActivity:${currentSport}.type_three.max`),
    },
    {
      label: t(`typesOfActivity:${currentSport}.type_four.label`),
      description: t(`typesOfActivity:${currentSport}.type_four.description`),
      value: 'type_four',
      max: t(`typesOfActivity:${currentSport}.type_four.max`),
    },
  ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {eventOnEdition
          ? 'Choose the type of activity for this event. Remember you can preset any of these options in your group settings.'
          : 'When you create an event, the selected activity on this screen will prefill the activiy in the event you create. Of course you can change your event activity if you want to do something different.'}
      </BodyTwo>
      <TwoLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            eventOnEdition
              ? (changeEventActivity({
                  eventId: eventId,
                  groupId: groupId,
                  activity: option.value,
                }),
                changeEventMaxParticipants({
                  eventId: eventId,
                  groupId: groupId,
                  maxParticipants: option.max,
                }))
              : creatingEvent
              ? eventActions.createEventActivity({
                  activity: option.value,
                  maxParticipants: option.max,
                })
              : changeGroupTypeOfActivity({
                  groupId: currentGroupId,
                  activity: option.value,
                })
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

  const creatingEvent = navData.route.params
    ? navData.route.params.createEvent
    : false;

  return {
    headerTitle: editingEvent
      ? "Event's activity"
      : creatingEvent
      ? 'Select an activity'
      : 'Default activity for events',
    presentation: 'modal',
  };
};
