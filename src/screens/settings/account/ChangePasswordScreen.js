/** @format */

// GENERAL
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../../services/i18n';
import { useToast } from 'react-native-toast-notifications';
import { Controller, useForm } from 'react-hook-form';

// ACTIONS

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

// COMPONENTS
import Input from '../../../components/Forms/Input/Input';
import BodyTwo from '../../../components/type/BodyTwo';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';

export default function ChangePasswordScreen(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [sent, setSent] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // setup of our form
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    setLoading(true);
    setNewError(null);
    try {
      dispatch(authActions.changePassword(data.password));
    } catch (err) {
      toast.show(err.message, { type: 'danger', duration: 4000 });
      setLoading(false);
    }
    toast.show(t('settings:account.password.success'), { duration: 5000 });
    dispatch(authActions.logout());
  };

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        ...Styles.formPadded,
      }}
    >
      <BodyTwo style={{ paddingHorizontal: 8, paddingBottom: 16 }}>
        Puedes cambiar tu contraseña las veces que quieras. Recuerda que las
        contraseñas no pueden ser de menos de 6 caracteres y hasta un máximo de
        30.{' '}
      </BodyTwo>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^\S+$/,
          minLength: 6,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoComplete='password'
            autoCorrect={false}
            error={errors.password}
            helper={
              errors.password && errors.password.type === 'required'
                ? t('errors:fieldRequired')
                : errors.password && errors.password.type === 'minLength'
                ? t('errors:weakPassword')
                : errors.password && errors.password.type === 'pattern'
                ? t('errors:invalidPasswordChoice')
                : false
            }
            name={t('settings:account.password.newPassword')}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={t('settings:account.password.passwordPlaceholder')}
            returnKeyType='next'
            secureTextEntry={true}
            value={value}
            autoFocus
          />
        )}
        name='password'
      />
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
          pattern: /^\S+$/,
          validate: {
            matchesPreviousPassword: value => {
              const { password } = getValues();
              return password === value;
            },
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoComplete='password'
            autoCorrect={false}
            error={errors.repeatPassword}
            helper={
              errors.repeatPassword && errors.repeatPassword.type === 'required'
                ? t('errors:fieldRequired')
                : errors.repeatPassword &&
                  errors.repeatPassword.type === 'minLength'
                ? t('errors:weakPassword')
                : errors.repeatPassword &&
                  errors.repeatPassword.type === 'pattern'
                ? t('errors:invalidPasswordChoice')
                : errors.repeatPassword &&
                  errors.repeatPassword.type === 'matchesPreviousPassword'
                ? 'Las contraseñas deben coincidir'
                : false
            }
            name={t('settings:account.password.repeatPassword')}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={t('settings:account.password.repeatActionPlaceholder')}
            returnKeyType='next'
            secureTextEntry={true}
            value={value}
          />
        )}
        name='repeatPassword'
      />
      <ButtonFilled
        style={{ marginHorizontal: 8, marginVertical: 16 }}
        onPress={handleSubmit(onSubmit)}
        loading={loading ? true : false}
      >
        {loading ? t('loaders:changing') : t('settings:changepassword')}
      </ButtonFilled>
    </ScrollView>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:changepassword'),
    presentation: 'modal',
  };
};
