/** @format */

import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { t } from '../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import React, { useState } from 'react';

// CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

// COMPONENTS
import BodyOne from '../../components/type/BodyOne';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import Input from '../../components/Forms/Input/Input';

export default function SettingsFeedbackScreen(props) {
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

  const onSubmit = data => setSent(true);

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        ...Styles.formPadded,
      }}
    >
      {!sent ? (
        <>
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
                placeholder={t('settings:feedback.form.placeholder')}
                helper={
                  errors.feedback && errors.feedback.type === 'required'
                    ? t('errors:fieldRequired')
                    : errors.feedback && errors.feedback.type === 'minLength'
                    ? t('errors:descriptionLength')
                    : errors.feedback && errors.feedback.type === 'maxLength'
                    ? t('errors:descriptionLength')
                    : false
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.feedback}
                name={t('settings:feedback.feedback')}
                autoFocus
                autoCorrect={false}
                returnKeyType='send'
                style={{ minHeight: 80 }}
              />
            )}
            name='feedback'
          />
          <ButtonFilled
            error={errors.feedback}
            loading={loading ? true : false}
            onPress={handleSubmit(onSubmit)}
            style={{ marginHorizontal: 8, marginBottom: 32, marginTop: 4 }}
          >
            {loading
              ? t('loaders:sending')
              : t('settings:feedback.form.sendFeedback')}
          </ButtonFilled>
        </>
      ) : (
        <View style={{ paddingBottom: 16, paddingHorizontal: 8 }}>
          <BodyOne style={{ paddingBottom: 16 }}>
            {t('settings:feedback.received')}
          </BodyOne>
          <ButtonFilled onPress={() => setSent(false)}>
            {t('common:sendAnother')}
          </ButtonFilled>
        </View>
      )}
    </ScrollView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:feedback.feedback'),
    presentation: 'modal',
  };
};
