/** @format */

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Card from '../../components/Card';
import CheckBox from 'expo-checkbox';
import SingleLineWithSwitch from '../../components/Lists/OneLine/SingleLineWithSwitch';
import SingleLineWithRadio from '../../components/Lists/OneLine/SingleLineWithRadio';
import Caption from '../../components/type/Caption';
import TwoLineItemWithSwitch from '../../components/Lists/TwoLines/TwoLineItemWithSwitch';
import BodyTwo from '../../components/type/BodyTwo';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

export default function AcceptTermsScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);
  return (
    <View>
      <BodyTwo style={{ padding: 16 }}>
        Para poder registrarte y participar de la comunidad debes aceptar todos
        estos términos y servicios. Este paso es obligatorio.
      </BodyTwo>
      <SingleLineWithSwitch title='Términos y condiciones'>
        <CheckBox
          disabled={true}
          value={true}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          color={
            darkMode
              ? Colors.dark.OnBackgroundActive
              : Colors.light.OnBackgroundActive
          }
        />
      </SingleLineWithSwitch>
      <SingleLineWithSwitch
        title='Política de Privacidad'
        onPress={() => setToggleCheckBox(!toggleCheckBox)}
      >
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          color={
            darkMode
              ? Colors.dark.OnBackgroundActive
              : Colors.light.OnBackgroundActive
          }
        />
      </SingleLineWithSwitch>

      <SingleLineWithSwitch
        title='Términos de suscripción'
        onPress={() => setToggleCheckBox2(!toggleCheckBox2)}
      >
        <CheckBox
          disabled={false}
          value={toggleCheckBox2}
          onValueChange={newValue => setToggleCheckBox2(newValue)}
          color={
            darkMode
              ? Colors.dark.OnBackgroundActive
              : Colors.light.OnBackgroundActive
          }
        />
      </SingleLineWithSwitch>
      <View style={{ padding: 16 }}>
        <ButtonFilled
          onPress={() => props.navigation.navigate('AcceptCookies')}
        >
          Next
        </ButtonFilled>
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Aceptar términos',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
