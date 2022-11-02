/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import { Controller, useForm } from 'react-hook-form';
import FormLayout from '../../../components/Forms/FormLayout/FormLayout';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';
import Input from '../../../components/Forms/Input/Input';
import { useEffect } from 'react';
import Colors from '../../../constants/Colors';
import { useToast } from 'react-native-toast-notifications';
import { t } from '../../../services/i18n';
import { eventActions } from '../../../store/slices/event';
import BodyTwo from '../../../components/type/BodyTwo';
import SubHeader from '../../../components/SubHeader/SubHeader';

// COMPONENTS

// STORE

export default function CreateEventScreen(props) {
  const me = useSelector(state => state.me.myData);
  const createEvent = useSelector(state => state.event.createEvent);
  const groupDetail = useSelector(state => state.group.groupDetail);

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

  const newDate = new Date();

  useEffect(() => {
    setValue('title', createEvent.title);
    setValue('description', createEvent.description);
    dispatch(
      eventActions.setupEventCreation({
        visibility: groupDetail.preferences.group.visibility.visibility,
        allowInvitations: groupDetail.preferences.events.invitations,
        activity: groupDetail.preferences.events.activity,
        allowReplacementsType: groupDetail.preferences.events.replacements,
        allowedParticipants: groupDetail.preferences.events.participation,
        allowedGender: groupDetail.preferences.group.membership.diversity,
        skill: groupDetail.preferences.events.skill,
        when: newDate.toDateString(),
        maxParticipants: t(
          `typesOfActivity:${groupDetail.sport.title}.type_one.max`
        ),
      })
    );
  }, []);

  const onSubmit = data => {
    dispatch(
      eventActions.addTitleAndDescription({
        title: data.title,
        description: data.description,
        externalLink: data.externalLink,
      })
    );
    props.navigation.navigate('CreateEventOptionsScreen');
  };

  return (
    <>
      <ScrollViewLayout>
        <FormLayout>
          <BodyTwo style={{ paddingHorizontal: 8, marginBottom: 8 }}>
            Focus on the basic event data, you can edit anything later.
          </BodyTwo>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3,
              maxLength: 50,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='Ex. "Offroad route over Corserolla"'
                placeholderTextColor={Colors.light.OnSurfaceDisabled}
                helper={
                  errors.title && errors.title.type === 'required'
                    ? t('errors:fieldRequired')
                    : errors.title && errors.title.type === 'minLength'
                    ? t('errors:titleLength')
                    : errors.title && errors.title.type === 'maxLength'
                    ? t('errors:descriptionLengtha')
                    : false
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.title}
                name='Title'
                autoFocus
                autoCorrect={false}
              />
            )}
            name='title'
          />
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3,
              maxLength: 500,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                multiline={true}
                placeholder={t(
                  'settings:profile.basicInformation.descriptionRequirement'
                )}
                placeholderTextColor={Colors.light.OnSurfaceDisabled}
                helper={
                  errors.description && errors.description.type === 'required'
                    ? t('errors:fieldRequired')
                    : errors.description &&
                      errors.description.type === 'minLength'
                    ? t('errors:descriptionLength')
                    : errors.description &&
                      errors.description.type === 'maxLength'
                    ? t('errors:descriptionLengtha')
                    : false
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.description}
                name={t('settings:profile.basicInformation.description')}
                autoCorrect={false}
                returnKeyType='send'
                style={{ minHeight: 80 }}
              />
            )}
            name='description'
          />
          <Controller
            control={control}
            rules={{
              minLength: 3,
              maxLength: 50,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='Paste map links, strava, komoot…'
                placeholderTextColor={Colors.light.OnSurfaceDisabled}
                helper={
                  errors.title && errors.title.type === 'required'
                    ? t('errors:fieldRequired')
                    : errors.title && errors.title.type === 'minLength'
                    ? t('errors:titleLength')
                    : errors.title && errors.title.type === 'maxLength'
                    ? t('errors:descriptionLengtha')
                    : false
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.title}
                name='Link externo (optional)'
                autoCorrect={false}
              />
            )}
            name='externalLink'
          />
          <ButtonFilled onPress={handleSubmit(onSubmit)}>Next</ButtonFilled>
        </FormLayout>
      </ScrollViewLayout>
    </>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Create an event',
  };
};
