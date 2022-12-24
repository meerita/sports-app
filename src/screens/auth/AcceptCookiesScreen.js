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
import { t } from '../../services/i18n';
import App from '../../constants/App';

export default function AcceptCookiesScreen(props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);
  return (
    <View>
      <BodyTwo style={{ padding: 16 }}>
        {t('auth:register.acceptCookies.description', { brand: App.name })}
      </BodyTwo>
      <TwoLineItemWithSwitch
        title={t('auth:register.acceptCookies.types.essentials')}
        subtitle={t('auth:register.acceptCookies.types.essentialsDesc')}
        onPress={() => setToggleCheckBox(!toggleCheckBox)}
      >
        <CheckBox
          disabled={true}
          value={true}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('auth:register.acceptCookies.types.analytics')}
        subtitle={t('auth:register.acceptCookies.types.essentialsDesc')}
        onPress={() => setToggleCheckBox(!toggleCheckBox)}
      >
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
      </TwoLineItemWithSwitch>

      <TwoLineItemWithSwitch
        title={t('auth:register.acceptCookies.types.marketing')}
        subtitle={t('auth:register.acceptCookies.types.marketingDesc')}
        onPress={() => setToggleCheckBox2(!toggleCheckBox2)}
      >
        <CheckBox
          disabled={false}
          value={toggleCheckBox2}
          onValueChange={newValue => setToggleCheckBox2(newValue)}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('auth:register.acceptCookies.types.other')}
        subtitle={t('auth:register.acceptCookies.types.otherDesc')}
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
          {t('common:nextStep')}
        </ButtonFilled>
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('auth:register.acceptCookies.title'),
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
