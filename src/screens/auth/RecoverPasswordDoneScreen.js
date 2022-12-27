/** @format */

import { View, Text, Button, Image } from 'react-native';
import React from 'react';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../components/type/BodyTwo';
import FormLayout from '../../components/Forms/FormLayout/FormLayout';
import Input from '../../components/Forms/Input/Input';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import { t } from '../../services/i18n';
import Colors from '../../constants/Colors';
import PlaceholderLayout from '../../components/Layouts/PlaceholderLayout/PlaceholderLayout';
import HeadlineSix from '../../components/type/HeadlineSix';

export default function RecoverPasswordDoneScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <PlaceholderLayout>
      <Image
        source={require('../../assets/images/placeholders/important.png')}
        style={{
          tintColor: darkMode
            ? Colors.dark.OnBackgroundUnfocused
            : Colors.light.OnBackgroundUnfocused,
          marginBottom: 16,
        }}
      />
      <HeadlineSix
        style={{ paddingBottom: 16, paddingHorizontal: 8, textAlign: 'center' }}
      >
        {t('auth:recoverPassword.emailSentTo', {
          mail: props.route.params.mail,
        })}
      </HeadlineSix>
      <ButtonFilled
        style={{ flexGrow: 0 }}
        onPress={() => props.navigation.popToTop()}
      >
        {t('common:back')}
      </ButtonFilled>
    </PlaceholderLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('auth:recoverPassword.recover'),
    // headerBackTitle: null,
  };
};
