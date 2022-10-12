/** @format */

import { ScrollView } from 'react-native';
import { t } from '../../../../services/i18n';
import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

// COMPONENTS
import ButtonFilled from '../../../../components/Buttons/Filled/ButtonFilled';
import Input from '../../../../components/Forms/Input/Input';
import BodyTwo from '../../../../components/type/BodyTwo';

// CONSTANTS
import Styles from '../../../../constants/Styles';
import Colors from '../../../../constants/Colors';
import { changeMyUsername } from '../../../../store/actions/me';

export default function BasicInformationUsernameScreen(props) {
  const me = useSelector(state => state.me.myData);
  const darkMode = useSelector(state => state.theme.darkMode);

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
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
    setLoading(true);
    setNewError(null);
    try {
      await dispatch(changeMyUsername(data.username));
    } catch (err) {
      toast.show(err.message, { type: 'danger', duration: 4000 });
      setLoading(false);
    }
    setLoading(false);
    props.navigation.popToTop();
  };

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        ...Styles.formPadded,
      }}
    >
      <BodyTwo style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
        {t('settings:profile.basicInformation.userNameInfo')}
      </BodyTwo>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
          minLength: 3,
          maxLength: 20,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={me.username}
            placeholderTextColor={Colors.light.OnSurfaceDisabled}
            helper={
              errors.username && errors.username.type === 'required'
                ? t('errors:fieldRequired')
                : errors.username && errors.username.type === 'pattern'
                ? t('errors:userNameCantBe')
                : errors.username && errors.username.type === 'minLength'
                ? t('errors:userNameLength')
                : errors.username && errors.username.type === 'maxLength'
                ? t('errors:userNameLength')
                : false
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.username}
            name={t('settings:profile.basicInformation.userName')}
            autoFocus
            autoCorrect={false}
            returnKeyType='send'
          />
        )}
        name='username'
      />

      <ButtonFilled
        error={errors.username}
        loading={loading ? true : false}
        onPress={handleSubmit(onSubmit)}
        style={{ marginHorizontal: 8, marginBottom: 32, marginTop: 4 }}
      >
        {loading
          ? t('loaders:changing')
          : t('settings:profile.basicInformation.changeUserName')}
      </ButtonFilled>
    </ScrollView>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:profile.basicInformation.userName'),
    presentation: 'modal',
  };
};
