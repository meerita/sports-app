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

// CONSTANTS
import Styles from '../../../constants/Styles';
import Colors from '../../../constants/Colors';

export default function PreferencesWeightScreen(props) {
  // we get our auth data
  const preferences = useSelector(
    state => state.me.myData.settings.preferences
  );

  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

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
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      }}
    >
      <BodyTwo style={{ padding: 16 }}>
        Our app will convert and show all measurements units to your favorite
        dimension unit.
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            meActions.changeWeightSystem(auth.userId, auth.token, option.value)
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
    headerTitle: t('settings:preferences.unitSystem'),
    presentation: 'modal',
  };
};
