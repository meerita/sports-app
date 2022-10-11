/** @format */

// GENERAL
import { View, Text, ScrollView } from 'react-native';
import { t } from '../../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import React, { useState } from 'react';

// COMPONENTS
import SingleLineWithRadio from '../../../components/Lists/OneLine/SingleLineWithRadio';
import BodyTwo from '../../../components/type/BodyTwo';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

// CONSTANTS
import Styles from '../../../constants/Styles';
import Colors from '../../../constants/Colors';

// STORE
import { changeWeights } from '../../../store/actions/me';

export default function PreferencesWeightScreen(props) {
  // we get our auth data
  const preferences = useSelector(
    state => state.me.myData.settings.preferences
  );

  const currentSystem = preferences.weights;

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(currentSystem === 'metric' ? 0 : 1);

  // DATA
  const OPTIONS = [
    {
      label: t('common:height.metric.title'),
      value: 'metric',
    },
    {
      label: t('common:height.imperial.title'),
      value: 'imperial',
    },
  ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {t('settings:preferences.weights.description')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(changeWeights(option.value)),
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
    headerTitle: t('settings:preferences.weights.title'),
    presentation: 'modal',
  };
};
