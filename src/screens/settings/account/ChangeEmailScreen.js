/** @format */

import { ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { t } from '../../../services/i18n';
import i18next, { use } from 'i18next';
import languageDetector from '../../../services/i18n/language-detector';
import React, { useState } from 'react';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

// TYPE
import BodyOne from '../../../components/type/BodyOne';
import Input from '../../../components/Forms/Input/Input';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';

export default function ChangeEmailScreen(props) {
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

  // current user locale
  const { language } = i18next.use(languageDetector);

  // setup of our form
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // our submit handler
  const onSubmit = async data => {
    setLoading(true);
    setNewError(null);
    try {
      await dispatch(authActions.changeEmail(data.email, language));
    } catch (err) {
      toast.show(err.message, { type: 'danger', duration: 4000 });
      setLoading(false);
    }
    setLoading(false);
    toast.show(t('auth:recoverPassword.emailSentTo'));
    // props.navigation.popToTop();
  };

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        ...Styles.formPadded,
      }}
    >
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
                ? 'Los emails deben coincidir'
                : false
            }
            placeholder={'Los emails deben coincidir'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.repeatEmail}
            name={t('auth:emailConfirm')}
          />
        )}
        name='repeatEmail'
      />
      <ButtonFilled
        loading={loading ? true : false}
        onPress={handleSubmit(onSubmit)}
        style={{ marginHorizontal: 8, marginBottom: 32, marginTop: 8 }}
      >
        {loading ? t('loaders:changing') : t('settings:emailDesc')}
      </ButtonFilled>
    </ScrollView>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:emailDesc'),
    presentation: 'modal',
  };
};
