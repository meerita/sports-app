/** @format */

import { ScrollView } from 'react-native';
import { t } from '../../../../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import React, { useState } from 'react';
import convert from 'convert-units';

// REDUX ACTIONS

// CONSTANTS
import Styles from '../../../../../constants/Styles';
import Colors from '../../../../../constants/Colors';

// COMPONENTS
import BodyTwo from '../../../../../components/type/BodyTwo';
import SingleLineWithRadio from '../../../../../components/Lists/OneLine/SingleLineWithRadio';

// STORE
import { changeMyHeight } from '../../../../../store/actions/me';

export default function BasicInformationHeightSelectorScreen(props) {
  // myData
  const me = useSelector(state => state.me.myData);
  // preferences of my user
  const preferences = useSelector(
    state => state.me.myData.settings.preferences
  );
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // we will find out which gender this user has and set it as initial state
  const currentHeight = me.characteristics.height;

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(currentHeight);

  const weightRange = [...Array(221).keys()].slice(100, 220);

  // options for the radio buttons
  const OPTIONS = weightRange
    .map(index => ({
      label:
        preferences.dimensions === 'imperial'
          ? t('common:height.ft-us', {
              ft: convert(index).from('cm').to('ft-us').toFixed(0),
              in: convert(index).from('cm').to('ft-us').toFixed(2).slice(2),
            })
          : t('common:height.m', {
              height: convert(index).from('cm').to('m').toFixed(2),
            }),
      value: index,
    }))
    .reverse();

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        ...Styles.formPadded,
      }}
    >
      <BodyTwo style={{ paddingHorizontal: 10, paddingBottom: 16 }}>
        {t('common:weight.weightInfo')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(changeMyHeight(option.value)),
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
    headerTitle: t('common:height.height'),
    presentation: 'modal',
  };
};
