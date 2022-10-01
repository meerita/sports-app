/** @format */

import { ScrollView } from 'react-native';
import { t } from '../../../../services/i18n';
import React, { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

// COMPONENTS
import BodyTwo from '../../../../components/type/BodyTwo';
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';

// CONSTANTS
import Styles from '../../../../constants/Styles';
import Colors from '../../../../constants/Colors';

export default function BasicInformationGenderScreen(props) {
  // My Data
  const me = useSelector(state => state.me.myData);

  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // we will find out which gender this user has and set it as initial state
  const currentGender =
    me.characteristics.gender === 'male'
      ? 0
      : me.characteristics.gender === 'female'
      ? 1
      : 2;

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(currentGender);

  // options for the radio buttons
  const OPTIONS = [
    {
      label: t('settings:profile.basicInformation.male'),
      value: 'male',
    },
    {
      label: t('settings:profile.basicInformation.female'),
      value: 'female',
    },
    {
      label: t('settings:profile.basicInformation.other'),
      value: 'other',
    },
  ];

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        ...Styles.formPadded,
      }}
    >
      <BodyTwo style={{ paddingHorizontal: 10, paddingBottom: 16 }}>
        {t('settings:profile.basicInformation.genderInfo')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            meActions.changeGender(auth.userId, auth.token, option.value)
          ),
          setSelected(index),
          toast.show(t('common:infoUpdated')),
          props.navigation.goBack()
        )}
      />
    </ScrollView>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:profile.basicInformation.gender'),
    presentation: 'modal',
  };
};
