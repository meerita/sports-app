/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BodyOne from '../../../components/type/BodyOne';
import SubtitleOne from '../../../components/type/SubtitleOne';
import HeadlineFive from '../../../components/type/HeadlineFive';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import SuperHeader from '../../../components/Headers/SuperHeader/SuperHeader';
import Colors from '../../../constants/Colors';
import Line from '../../../components/Line/Line';
import SingleLineWithIcon from '../../../components/Lists/OneLine/SingleLineWithIcon';
import { t } from '../../../services/i18n';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';
import { eventActions } from '../../../store/slices/event';
import { createReducer } from '@reduxjs/toolkit';
import moment from 'moment';
import SubHeader from '../../../components/SubHeader/SubHeader';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';
import { createANewEvent } from '../../../store/actions/event';

export default function CreateEventOptionsScreen(props) {
  const me = useSelector(state => state.me.myData);
  const createEvent = useSelector(state => state.event.createEvent);
  const groupDetail = useSelector(state => state.group.groupDetail);
  const darkMode = useSelector(state => state.theme.darkMode);

  console.log(createEvent);

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // we initialize Toasts
  const toast = useToast();

  // setup of our form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const createEventHandler = () => {
    try {
      dispatch(
        createANewEvent({
          ...createEvent,
          sport: groupDetail.sport._id,
          group: groupDetail._id,
          organizer: me._id,
        })
      );
      dispatch(eventActions.resetState());
      // take me to the group event page
      props.navigation.pop(2);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SuperHeader>
        <HeadlineFive
          style={{
            color: darkMode
              ? Colors.dark.OnSurfaceActive
              : Colors.light.OnSurfaceActive,
          }}
        >
          {createEvent.title}
        </HeadlineFive>
      </SuperHeader>
      <ScrollViewLayout>
        <BodyOne style={{ padding: 16, paddingBottom: 24 }}>
          {createEvent.description}
        </BodyOne>
        <Line />
        <SingleLineWithIcon
          icon={require('../../../assets/images/icons/event.png')}
          title={'When'}
          caption={moment(new Date()).calendar()}
        />
        <SingleLineWithIcon
          icon={{ uri: groupDetail.sport.iconUrl }}
          title={'Type of event'}
          caption={t(
            `typesOfActivity:${groupDetail.sport.title}.${createEvent.activity}.label`
          )}
          onPress={() =>
            props.navigation.navigate(
              'EventOptionsTypeOfActivitySelectorScreen',
              {
                createEvent: true,
              }
            )
          }
        />
        <SingleLineWithIcon
          icon={require('../../../assets/images/icons/verified.png')}
          title={'Difficulty'}
          caption={t(`skills:${createEvent.skill}.title`)}
          onPress={() =>
            props.navigation.navigate('EventOptionsSkillsSelectorScreen', {
              createEvent: true,
            })
          }
        />
        <SingleLineWithIcon
          icon={require('../../../assets/images/icons/person_pin_circle.png')}
          title={'Punto de encuentro'}
          caption={'Carrer Muntaner 16'}
        />

        <SubHeader title='options' />
        <SingleLineWithIcon
          icon={require('../../../assets/images/icons/group.png')}
          title='Max participants'
          caption={createEvent.maxParticipants}
        />
        <SingleLineWithIcon
          icon={require('../../../assets/images/icons/visibility_on.png')}
          title={t('settings:profile.basicInformation.visibility.visibility')}
          caption={
            createEvent.visibility
              ? t('groups:settings.events.types.anyone')
              : t('groups:settings.events.types.only-my-group')
          }
          onPress={() =>
            props.navigation.navigate('EventOptionsVisibilitySelectorScreen', {
              createEvent: true,
            })
          }
        />
        <SingleLineWithIcon
          icon={require('../../../assets/images/icons/manage_accounts.png')}
          title={'Participation…'}
          caption={t(
            `groups:settings.events.types.${createEvent.allowedParticipants}`
          )}
          onPress={() =>
            props.navigation.navigate(
              'EventOptionsParticipationSelectorScreen',
              {
                createEvent: true,
              }
            )
          }
        />
        <SingleLineWithIcon
          icon={require('../../../assets/images/icons/rsvp.png')}
          title={'Invitations'}
          caption={
            createEvent.allowInvitations ? 'Invites allowed' : 'No invitations'
          }
          onPress={() =>
            props.navigation.navigate('EventOptionsInvitationsSelectorScreen', {
              createEvent: true,
            })
          }
        />
        <SingleLineWithIcon
          icon={
            createEvent.allowedGender === 'other'
              ? require('../../../assets/images/icons/question_mark.png')
              : createEvent.allowedGender === 'male'
              ? require('../../../assets/images/icons/male.png')
              : require('../../../assets/images/icons/female.png')
          }
          title={'Gender'}
          caption={t(
            `groups:settings.gender.${
              createEvent.allowedGender === 'other'
                ? 'other'
                : createEvent.allowedGender === 'male'
                ? 'male'
                : 'female'
            }`
          )}
          onPress={() =>
            props.navigation.navigate('EventOptionsGenderSelectorScreen', {
              createEvent: true,
            })
          }
        />

        <SingleLineWithIcon
          icon={require('../../../assets/images/icons/replace.png')}
          title={'Replacements'}
          caption={t(
            `groups:settings.events.types.${createEvent.allowReplacementsType}.title`
          )}
          onPress={() =>
            props.navigation.navigate(
              'EventOptionsReplacementsSelectorScreen',
              {
                createEvent: true,
              }
            )
          }
        />
        <ButtonFilled
          onPress={() => createEventHandler()}
          style={{ margin: 16 }}
        >
          CREATE EVENT
        </ButtonFilled>
      </ScrollViewLayout>
    </>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: '',
    headerShadowVisible: false,
  };
};
