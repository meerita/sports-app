/** @format */

import { ScrollView, Text, View } from 'react-native';
import { t } from '../../../../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import React, { useState } from 'react';
import convert from 'convert-units';

// CONSTANTS
import Styles from '../../../../../constants/Styles';
import BodyTwo from '../../../../../components/type/BodyTwo';
import Colors from '../../../../../constants/Colors';

// COMPONENTS
import SingleLineWithRadio from '../../../../../components/Lists/OneLine/SingleLineWithRadio';
import { changeMyWeight } from '../../../../../store/actions/me';
import ScrollViewLayout from '../../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

// STORE

export default function BasicInformationWeightSelectorScreen(props) {
  // My data
  const me = useSelector(state => state.me.myData);
  // My preferences
  const preferences = useSelector(
    state => state.me.myData.settings.preferences
  );

  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // we will find out which gender this user has and set it as initial state
  const currentWeight = me.characteristics.weight;

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(currentWeight);

  const weightRange = [...Array(121).keys()].slice(0, 120); // estaba a 0, tengo que hacer pruebas TODO

  // options for the radio buttons
  const OPTIONS = weightRange.map(index => ({
    label:
      preferences.weights === 'imperial'
        ? t('common:weight.lb', {
            weight: convert(index).from('kg').to('lb').toFixed(0),
          })
        : t('common:weight.kg', { weight: index }),
    value: index,
  }));

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {t('common:weight.weightInfo')}aaaa
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(changeMyWeight(option.value)),
          setSelected(index),
          toast.show(t('common:infoUpdated')),
          props.navigation.goBack()
        )}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('common:weight.weight'),
    presentation: 'modal',
  };
};
