/** @format */

import { Platform } from 'react-native';
import { t } from '../../services/i18n';
import { useForm, Controller } from 'react-hook-form';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

// CONSTANTS
import Colors from '../../constants/Colors';

// COMPONENTS
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import FormLayout from '../../components/Forms/FormLayout/FormLayout';
import Input from '../../components/Forms/Input/Input';
import { createUser } from '../../store/actions/auth';

export default function RegisterScreen(props) {
  // toast notifications
  const toast = useToast();
  const cookies = useSelector(state => state.auth.signUp.cookies);

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
    getValues,
    formState: { errors },
  } = useForm();

  // our submit handler
  const onSubmit = async data => {
    try {
      setLoading(true);
      dispatch(
        createUser({
          data,
          cookies,
        })
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <FormLayout>
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

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[A-Za-z0-9_%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
          validate: {
            matchesPreviousPassword: value => {
              const { email } = getValues();
              return email === value;
            },
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            helper={
              errors.repeatEmail && errors.repeatEmail.type === 'required'
                ? t('errors:fieldRequired')
                : errors.repeatEmail &&
                  errors.repeatEmail.type === 'matchesPreviousPassword'
                ? t('errors:mustMatch')
                : false
            }
            placeholder={t('errors:mustMatch')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.repeatEmail}
            name={t('auth:emailConfirm')}
          />
        )}
        name='repeatEmail'
      />

      <Controller
        control={control}
        rules={{
          maxLength: 50,
          minLength: 6,
          pattern: /^([a-zA-Z0-9@*#]{6,15})$/,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            helper={
              errors.password && errors.password.type === 'required'
                ? 'Debes escribir una contraseña'
                : errors.password && errors.password.type === 'minLength'
                ? t('auth:errors.weakPassword')
                : errors.password && errors.password.type === 'pattern'
                ? 'La contraseña debe contener mayúsculas y minúsculas'
                : false
            }
            name={t('auth:password')}
            autoComplete='password'
            secureTextEntry={true}
            placeholder={t('settings:account.password.passwordPlaceholder')}
            error={errors.password}
          />
        )}
        name='password'
      />

      <ButtonFilled
        // loading={loading ? true : false}
        onPress={handleSubmit(onSubmit)}
        style={{ marginHorizontal: 8, marginBottom: 32 }}
      >
        {loading ? t('loaders:registering') : t('auth:register.register')}
      </ButtonFilled>
    </FormLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('auth:register.register'),
    headerBackTitle: 'Close',
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
