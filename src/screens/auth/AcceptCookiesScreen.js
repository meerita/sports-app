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

export default function AcceptCookiesScreen(props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);
  return (
    <View>
      <BodyTwo style={{ padding: 16 }}>
        MINIDE utiliza cookies para ofrecer una experiencia de uso superior.
        Además utilizamos estos datos para mejorar la aplicación, ofrecer
        mejores publicidades y rendimiento. De momento no hemos activado ningún
        tipo de cookie y puedes revocar estos servicios en todo momento.
      </BodyTwo>
      <TwoLineItemWithSwitch
        title='Básicas'
        subtitle='Cookies básicas para que funcione la app.'
        onPress={() => setToggleCheckBox(!toggleCheckBox)}
      >
        <CheckBox
          disabled={true}
          value={true}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title='Cookie de Analítica'
        subtitle='Las cookies que más nos interesan, así podemos aprender de nuestra comunidad y darles la mejor experiencia de uso'
        onPress={() => setToggleCheckBox(!toggleCheckBox)}
      >
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
      </TwoLineItemWithSwitch>

      <TwoLineItemWithSwitch
        title='Cookies de Marketing'
        subtitle='Con estas cookies te presentamos anuncios personalizados.'
        onPress={() => setToggleCheckBox2(!toggleCheckBox2)}
      >
        <CheckBox
          disabled={false}
          value={toggleCheckBox2}
          onValueChange={newValue => setToggleCheckBox2(newValue)}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title='Otras'
        subtitle='Con estas cookies te presentamos anuncios personalizados.'
        onPress={() => setToggleCheckBox3(!toggleCheckBox3)}
      >
        <CheckBox
          disabled={false}
          value={toggleCheckBox3}
          onValueChange={newValue => setToggleCheckBox3(newValue)}
        />
      </TwoLineItemWithSwitch>
      <View style={{ padding: 16 }}>
        <ButtonFilled
          onPress={() => props.navigation.navigate('RegisterScreen')}
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
    headerTitle: 'Cookies acceptance',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
