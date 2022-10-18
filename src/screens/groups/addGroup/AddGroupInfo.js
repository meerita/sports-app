/** @format */

import { View, Text } from 'react-native';
import React from 'react';

// COMPONENTS
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';
import FormLayout from '../../../components/Forms/FormLayout/FormLayout';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import BodyTwo from '../../../components/type/BodyTwo';
import { t } from '../../../services/i18n';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../../components/Forms/Input/Input';
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

import { groupActions } from '../../../store/slices/group';
import { useEffect } from 'react';

export default function AddGroupInfo(props) {
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
  const createGroupInfo = useSelector(state => state.group.createNewGroup);

  // setup of our form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('title', createGroupInfo.title);
    setValue('description', createGroupInfo.description);
  }, []);

  const onSubmit = data => {
    dispatch(
      groupActions.addTitleAndDescription({
        title: data.title,
        description: data.description,
      })
    );
    props.navigation.navigate('CreateGroupResume');
  };

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ paddingHorizontal: 16 }}>
        {t('groups:create.groupInfoDesc')}
      </BodyTwo>
      <FormLayout>
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
          {t('groups:create.form.nextStep')}
        </ButtonFilled>
      </FormLayout>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:create.groupInfo'),
  };
};
