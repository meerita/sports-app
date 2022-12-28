/** @format */

import { View } from 'react-native';
import React, { useState } from 'react';
import CheckBox from 'expo-checkbox';
import TwoLineItemWithSwitch from '../../components/Lists/TwoLines/TwoLineItemWithSwitch';
import BodyTwo from '../../components/type/BodyTwo';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import { t } from '../../services/i18n';
import App from '../../constants/App';
import { authActions } from '../../store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';

export default function AcceptCookiesScreen(props) {
  const cookiesAcceptation = useSelector(state => state.auth.signUp.cookies);

  console.log(cookiesAcceptation);

  const [toggleCheckBox, setToggleCheckBox] = useState(
    cookiesAcceptation.analytics
  );
  const [toggleCheckBox2, setToggleCheckBox2] = useState(
    cookiesAcceptation.marketing
  );
  const [toggleCheckBox3, setToggleCheckBox3] = useState(
    cookiesAcceptation.others
  );

  const dispatch = useDispatch();

  const accceptAnalyticsCookies = () => {
    setToggleCheckBox(!toggleCheckBox);
    dispatch(authActions.signUpAcceptAnalyticsCookies());
  };

  const acceptMarketingCookies = () => {
    setToggleCheckBox2(!toggleCheckBox2);
    dispatch(authActions.signUpAcceptMarketingCookies());
  };

  const acceptOtherCookies = () => {
    setToggleCheckBox3(!toggleCheckBox3);
    dispatch(authActions.signUpAcceptOtherCookies());
  };

  return (
    <View>
      <BodyTwo style={{ padding: 16 }}>
        {t('auth:register.acceptCookies.description', { brand: App.name })}
      </BodyTwo>
      <TwoLineItemWithSwitch
        title={t('auth:register.acceptCookies.types.essentials')}
        subtitle={t('auth:register.acceptCookies.types.essentialsDesc')}
      >
        <CheckBox disabled={true} value={true} />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('auth:register.acceptCookies.types.analytics')}
        subtitle={t('auth:register.acceptCookies.types.essentialsDesc')}
        onPress={() => accceptAnalyticsCookies()}
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
        onPress={() => acceptMarketingCookies()}
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
        onPress={() => acceptOtherCookies()}
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
