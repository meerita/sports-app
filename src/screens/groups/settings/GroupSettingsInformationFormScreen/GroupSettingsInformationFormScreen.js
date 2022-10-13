/** @format */

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { t } from '../../../../services/i18n';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../../components/type/BodyTwo';
import FormLayout from '../../../../components/Forms/FormLayout/FormLayout';
import Input from '../../../../components/Forms/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { useEffect } from 'react';
import ButtonFilled from '../../../../components/Buttons/Filled/ButtonFilled';
import Colors from '../../../../constants/Colors';

export default function GroupSettingsInformationFormScreen(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // state
  const groupInfo = useSelector(state => state.group.groupDetail);

  // setup of our form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    dispatch(
      groupActions.addTitleAndDescription({
        title: data.title,
        description: data.description,
      })
    );
    props.navigation.navigate('CreateGroupResume');
  };

  useEffect(() => {
    setValue('title', groupInfo.title);
    setValue('description', groupInfo.description);
  }, []);

  return (
    <ScrollViewLayout>
      <FormLayout>
        <BodyTwo style={{ paddingHorizontal: 8, paddingBottom: 16 }}>
          Esta es la información perteneciente a tu grupo que puedes cambiar en
          cualquier momento.
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
              placeholder={t('groups:create.form.title.placeholder')}
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
              name={t('groups:create.form.title.name')}
              autoFocus
              autoCorrect={false}
              returnKeyType='send'
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
        <ButtonFilled onPress={handleSubmit(onSubmit)}>
          {t('common:update')}
        </ButtonFilled>
      </FormLayout>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:settings.information.information'),
    presentation: 'modal',
  };
};
