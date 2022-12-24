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
import { t } from '../../services/i18n';
import Line from '../../components/Line/Line';

export default function AcceptTermsScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);
  return (
    <View>
      <BodyTwo style={{ padding: 16 }}>
        {t('auth:register.acceptTerms.acceptTermsDesc')}
      </BodyTwo>
      <BodyTwo>Leer Términos y condiciones.</BodyTwo>
      <BodyTwo>Leer Política de Privacidad.</BodyTwo>
      <BodyTwo>Leer Términos de suscripción.</BodyTwo>
      <Line />
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
          {t('common:nextStep')}
        </ButtonFilled>
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('auth:register.acceptTerms.title'),
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
