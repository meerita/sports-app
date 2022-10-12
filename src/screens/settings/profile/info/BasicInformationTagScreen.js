/** @format */

import { ScrollView } from 'react-native';
import { t } from '../../../../services/i18n';
import React, { useEffect, useState } from 'react';
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
import { changeMyTag } from '../../../../store/actions/me';

export default function BasicInformationTagScreen(props) {
  const me = useSelector(state => state.me.myData);

  // DarkMode
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
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('tag', me.tag);
  }, [dispatch]);

  // our submit handler
  const onSubmit = async data => {
    setLoading(true);
    setNewError(null);

    try {
      await dispatch(changeMyTag(data.tag));
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
      <BodyTwo style={{ paddingHorizontal: 10, paddingBottom: 8 }}>
        {t('settings:profile.basicInformation.tagInfo')}
      </BodyTwo>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 500,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('settings:profile.basicInformation.tag')}
            placeholderTextColor={Colors.light.OnSurfaceDisabled}
            helper={
              errors.description && errors.description.type === 'required'
                ? t('errors:fieldRequired')
                : errors.description && errors.description.type === 'minLength'
                ? t('errors:descriptionLength')
                : errors.description && errors.description.type === 'maxLength'
                ? t('errors:descriptionLength')
                : false
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.description}
            name={t('settings:profile.basicInformation.tag')}
            autoFocus
            autoCorrect={false}
            returnKeyType='send'
          />
        )}
        name='tag'
      />
      <ButtonFilled
        error={errors.description}
        loading={loading ? true : false}
        onPress={handleSubmit(onSubmit)}
        style={{ marginHorizontal: 8, marginBottom: 32, marginTop: 4 }}
      >
        {loading
          ? t('loaders:changing')
          : t('settings:profile.basicInformation.changeTag')}
      </ButtonFilled>
    </ScrollView>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:profile.basicInformation.tag'),
    presentation: 'modal',
  };
};
