/** @format */

import React from 'react';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../components/type/BodyTwo';
import FormLayout from '../../components/Forms/FormLayout/FormLayout';
import Input from '../../components/Forms/Input/Input';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import { t } from '../../services/i18n';
import Colors from '../../constants/Colors';
import { sendPassword } from '../../store/actions/auth';

export default function RecoverPasswordScreen(props) {
  // toast notifications
  const toast = useToast();

  // loading state for the forms
  const [loading, setLoading] = useState(false);

  // we manage the errors for the forms
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // setup of our form
  const {
    control,
    handleSubmit,
    controller,
    getValues,
    formState: { errors },
  } = useForm();

  // our submit handler
  const onSubmit = async data => {
    try {
      setLoading(true);
      dispatch(sendPassword(data.email));
      props.navigation.navigate('RecoverPasswordDone', { mail: data.email });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (props.route.params.alreadyUser) {
    return (
      <ScrollViewLayout>
        <BodyTwo>Teta</BodyTwo>
      </ScrollViewLayout>
    );
  }

  return (
    <FormLayout>
      <BodyTwo style={{ paddingBottom: 8, paddingHorizontal: 8 }}>
        {t('auth:recoverPassword.recoverPasswordInfo')}
      </BodyTwo>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[A-Za-z0-9_%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('auth:onlyValidEmail')}
            placeholderTextColor={Colors.light.OnSurfaceDisabled}
            helper={
              errors.email && errors.email.type === 'required'
                ? t('errors:fieldRequired')
                : errors.email && errors.email.type === 'pattern'
                ? t('errors:invalidEmail')
                : false
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.email}
            name={t('auth:email')}
            autoFocus
            keyboardType='email-address'
            autoComplete='email'
            autoCorrect={false}
            returnKeyType='next'
            textContentType='emailAddress'
          />
        )}
        name='email'
      />
      <ButtonFilled onPress={handleSubmit(onSubmit)} style={{ marginTop: 8 }}>
        {loading ? t('loaders:recovering') : t('auth:recoverPassword.recover')}
      </ButtonFilled>
    </FormLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('auth:recoverPassword.recover'),
    // headerBackTitle: null,
  };
};
